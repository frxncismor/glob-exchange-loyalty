import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  title: string,
  content: string
}


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
 
  constructor(public dialogRef: MatDialogRef<ModalComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    // this.web3.modal$.subscribe(res => {
    //   this.modal = res;
    //   if (this.modal) {
    //     // this.openDialog();
    //   }
    // });
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }





}
