import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';
import { AlertComponent } from 'ngx-bootstrap';
import { AlterifyService } from 'src/app/Services/Alterify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
user: User;
  constructor(
    private userService: UserService,
    private alertify: AlterifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    console.log('inside image', this.user.photos);
    const imageUrls = [];
    for (const photo of this.user.photos) {
      console.log('inside photo');
      photo.url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBu_YsPRBXiClnUo6ScFT2csQ1reGW4PhhIQXVXx1051THp_OM&s';
      imageUrls.push(
        {
          small: photo.url,
          medium: photo.url,
          big: photo.url,
          description: photo.descriptuion
        }
      );
      console.log('photo url', photo.url);
    }
    return imageUrls;
  }

  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params['id'])
  //   .subscribe((user: User) => {
  //     this.user = user;
  //     console.log('Whole User Detail: ', user);
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }
}
