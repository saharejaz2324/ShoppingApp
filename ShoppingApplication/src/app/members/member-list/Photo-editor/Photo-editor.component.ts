import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { AuthService } from 'src/app/Services/auth.service';
import { Photo } from 'src/app/Models/photo';
import { UserService } from 'src/app/Services/user.service';
import { AlterifyService } from 'src/app/Services/Alterify.service';

@Component({
  selector: 'app-Photo-editor',
  templateUrl: './Photo-editor.component.html',
  styleUrls: ['./Photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlterifyService
  ) { }

  ngOnInit() {
    this.initializeUploader();
  }
  fileOverBase(e: any): void {
    console.log('inside upload');
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };


    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        // make a photo object to the response to the server
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          descriptuion: res.descriptuion,
          isMain: res.isMain
        };
        this.photos.push(photo);
        if (photo.isMain) {
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        }
      }
    }
  }

  setMainPhotos(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id)
    .subscribe(() => {
      this.currentMain = this.photos.filter(p => p.isMain === true)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
      this.authService.changeMemberPhoto(photo.url);
      this.authService.currentUser.photoUrl = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
    }, error => {
      this.alertify.error(error);
    });
  }

  deletePhoto(id: number) {
    this.alertify.confirm('Are You sure You want to delete this Photo? ', () =>
    {
      this.userService.deletePhoto(this.authService.decodedToken.nameid, id)
      .subscribe(() => {
        this.photos.splice(this.photos.findIndex( p => p.id === id
          ), 1);
        this.alertify.success('Photo has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the photo');
      });
    });
  }
}
