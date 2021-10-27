import { Component, OnInit } from '@angular/core';
import { Web3Service } from './../../util/web3.service';

declare let require: any;
const metacoin_artifacts = require('../../../../build/contracts/MetaCoin.json');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  accounts: string[];
  MetaCoin: any;

  model = {
    amount: 5,
    receiver: '',
    balance: 0,
    account: '',
    eth: 0
  };

  constructor(private web3Service: Web3Service) {}

  ngOnInit() {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();
    this.web3Service.artifactsToContract(metacoin_artifacts)
      .then((MetaCoinAbstraction) => {
        this.MetaCoin = MetaCoinAbstraction;
        this.MetaCoin.deployed().then(deployed => {
          console.log('deployed',deployed);
          deployed.Transfer({}, (err, ev) => {
            console.log('Transfer event came in, refreshing balance');
            this.refreshBalance();
          });
        });

      });
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
      console.log(this.model.account)
      this.refreshBalance();
    });
  }

  async refreshBalance() {
    console.log('Refreshing balance');

    try {
      const deployedMetaCoin = await this.MetaCoin.deployed();
      console.log(deployedMetaCoin);
      console.log('Account', this.model.account);
      const metaCoinBalance = await deployedMetaCoin.getBalance.call(this.model.account);
      const ethBalanceInWei = await this.web3Service.web3.eth.getBalance(this.model.account);
      const ethBalance = await this.web3Service.web3.utils.fromWei(ethBalanceInWei);
      console.log('Found balance: ' + metaCoinBalance);
      console.log('Eth balance: ' + ethBalance);
      this.model.balance = metaCoinBalance;
      this.model.eth = ethBalance;
    } catch (e) {
      console.error(e);
    }
  }

 

}
