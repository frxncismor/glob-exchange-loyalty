import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {MetaModule} from './meta/meta.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';
import { HeaderComponent } from './components/header/header.component';
import { UploadCertificateModule } from './components/upload-certificate/upload-certificate.module';
import { UploadedCertificatesModule } from './components/uploaded-certificates/uploaded-certificates.module';
import { RedeemPointsModule } from './components/redeem-points/redeem-points.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MetaModule,
    UploadCertificateModule,
    UploadedCertificatesModule,
    RedeemPointsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
