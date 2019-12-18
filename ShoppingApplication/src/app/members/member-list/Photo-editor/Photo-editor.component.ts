import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/Models/photo';

@Component({
  selector: 'app-Photo-editor',
  templateUrl: './Photo-editor.component.html',
  styleUrls: ['./Photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];

  constructor() { }

  ngOnInit() {
  }

}
