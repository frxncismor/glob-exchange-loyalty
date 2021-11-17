import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';
import { TokenService } from './../../util/token.service';

@Component({
  selector: 'app-contract-balance',
  templateUrl: './contract-balance.component.html',
  styleUrls: ['./contract-balance.component.css']
})
export class ContractBalanceComponent implements OnInit {
  contractBalance: any;
  constructor(private tokenService: TokenService, public dialog: MatDialog) { }

  ngOnInit() {
    this.tokenService.contractBalance$.subscribe(res => {
      this.contractBalance = res;
    });
  }

  fund() {
    this.tokenService.fundContract();
  }

}
