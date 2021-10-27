import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { UtilModule } from '../../util/util.module';
import { FormsModule } from '@angular/forms';
import { UploadCertificateComponent } from './upload-certificate.component';



@NgModule({
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
  ],
  declarations: [UploadCertificateComponent],
  exports: [UploadCertificateComponent]
})
export class UploadCertificateModule { }
