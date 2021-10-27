import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadedCertificatesComponent } from './uploaded-certificates.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { UtilModule } from './../../util/util.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UploadedCertificatesComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    RouterModule,
    UtilModule,
    FormsModule
  ], exports: [UploadedCertificatesComponent]
})
export class UploadedCertificatesModule { }
