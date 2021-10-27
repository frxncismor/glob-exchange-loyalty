import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-certificate',
  templateUrl: './upload-certificate.component.html',
  styleUrls: ['./upload-certificate.component.css']
})
export class UploadCertificateComponent implements OnInit {

  model = {
    title: '',
    url: ''
  };

  constructor() { 
  
  }

  ngOnInit() {
  }

  send() {
    if (this.model.title && this.model.url) {
      console.log(this.model);
    }
  }

}
