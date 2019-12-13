import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-value',
  templateUrl: './Value.component.html',
  styleUrls: ['./Value.component.css']
})
export class ValueComponent implements OnInit {
  values: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }
  getValues() {
    return this.http.get('https://localhost:44354/api/values').subscribe(data => {
      this.values = data;
    });
  }
}
