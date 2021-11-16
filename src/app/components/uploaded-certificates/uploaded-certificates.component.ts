import { Component, OnInit } from '@angular/core';
import { TokenService } from './../../util/token.service';

@Component({
  selector: 'app-uploaded-certificates',
  templateUrl: './uploaded-certificates.component.html',
  styleUrls: ['./uploaded-certificates.component.css']
})
export class UploadedCertificatesComponent implements OnInit {
  certificates = [];

  constructor(private tokenService: TokenService) { 
  
  }

  ngOnInit() {
    this.tokenService.courses$.subscribe(res => {
      this.certificates = res;
    });
  }

  send() {
  
  }
}
