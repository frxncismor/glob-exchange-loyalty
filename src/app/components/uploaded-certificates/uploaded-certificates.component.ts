import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploaded-certificates',
  templateUrl: './uploaded-certificates.component.html',
  styleUrls: ['./uploaded-certificates.component.css']
})
export class UploadedCertificatesComponent implements OnInit {

  certificates = [
    {
      title: 'Curso de programacion',
      url: 'https://www.cursodeprogramacion.com',
      date: '24/10/2021',
      image: 'https://cdn-icons-png.flaticon.com/512/2038/2038372.png'
    },
    {
      title: 'Curso de blockchain',
      url: 'https://www.cursodeblockchain.com',
      date: '24/10/2021',
      image: 'https://cdn-icons-png.flaticon.com/512/2038/2038372.png'
    },
    {
      title: 'Curso de blockchain',
      url: 'https://www.cursodeblockchain.com',
      date: '24/10/2021',
      image: 'https://cdn-icons-png.flaticon.com/512/2038/2038372.png'
    },
    {
      title: 'Curso de blockchain',
      url: 'https://www.cursodeblockchain.com',
      date: '24/10/2021',
      image: 'https://cdn-icons-png.flaticon.com/512/2038/2038372.png'
    },
    {
      title: 'Curso de blockchain',
      url: 'https://www.cursodeblockchain.com',
      date: '24/10/2021',
      image: 'https://cdn-icons-png.flaticon.com/512/2038/2038372.png'
    },
    {
      title: 'Curso de blockchain',
      url: 'https://www.cursodeblockchain.com',
      date: '24/10/2021',
      image: 'https://cdn-icons-png.flaticon.com/512/2038/2038372.png'
    },
  ];

  constructor() { 
  
  }

  ngOnInit() {
  }

  send() {
  
  }
}
