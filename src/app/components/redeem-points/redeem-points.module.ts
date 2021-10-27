import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedeemPointsComponent } from './redeem-points.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { UtilModule } from './../../../app/util/util.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [RedeemPointsComponent],
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
  exports: [RedeemPointsComponent]
})
export class RedeemPointsModule { }
