import { Component, OnInit, Output } from '@angular/core';
import { TokenService } from './../../util/token.service';
import { Web3Service } from './../../util/web3.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  accounts: string[];
  MetaCoin: any;

  model = {
    balance: 0,
    account: '',
    eth: 0
  };

  constructor(private web3Service: Web3Service, private tokenService: TokenService) {}

  ngOnInit() {

    this.watchAccount();
  }

  watchAccount() {
    this.tokenService.tokensBalance$.subscribe((tokenBalance: any) => {
      this.model.balance = parseInt(tokenBalance.words);
    });
    this.tokenService.ethBalance$.subscribe((ethBalance: any) => {
      console.log('ethBalance ',ethBalance)
      this.model.eth = ethBalance;
    });
    this.tokenService.account$.subscribe((account: any) => {
      console.log('account ',account)
      this.model.account = account;
    });
  }



 

}
