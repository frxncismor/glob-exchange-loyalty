import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Web3Service } from './web3.service';

declare let require: any;
const loyalty_artifacts = require('./../../../build/contracts/LoyaltyRewards.json');

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  model = {
    account: new BehaviorSubject(''),
    balance: new BehaviorSubject(0),
    eth: new BehaviorSubject(0)
  };

  courses = new BehaviorSubject([]);
  fundableEther = new BehaviorSubject(0);
  contractBalance = new BehaviorSubject(0);
  
  public tokensBalance$ = this.model.balance.asObservable();
  public ethBalance$  = this.model.eth.asObservable();
  public account$  = this.model.account.asObservable();
  public courses$ =  this.courses.asObservable();
  public fundableEther$ =  this.fundableEther.asObservable();
  public contractBalance$ =  this.contractBalance.asObservable();
  
  accounts: string[];
  LoyaltyRewards: any;
  currentAccount: any;

  constructor(private web3Service: Web3Service) { 
    this.watchAccount();
    this.web3Service.artifactsToContract(loyalty_artifacts)
      .then((LoyaltyRewardsAbstraction) => {
        console.log(LoyaltyRewardsAbstraction);
        this.LoyaltyRewards = LoyaltyRewardsAbstraction;
        this.LoyaltyRewards.deployed().then(deployed => {
          console.log('deployed',deployed);
          this.refreshBalance();
        });

      });
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.currentAccount = accounts[0];
      this.model.account.next(this.currentAccount);
      this.refreshBalance();
    });
  }

  async refreshBalance() {
    console.log('Refreshing balance');
    try {
      const deployedLoyaltyRewards = await this.LoyaltyRewards.deployed();
      const LoyaltyRewardsBalance = await deployedLoyaltyRewards.getLoyaltyPoints.call({from: this.currentAccount});
      console.log('getLoyaltyPoints', LoyaltyRewardsBalance.words[0]);
      const ethBalanceInWei = await this.web3Service.web3.eth.getBalance(this.currentAccount);
      const ethBalance = await this.web3Service.web3.utils.fromWei(ethBalanceInWei);
      const contractBalance = await deployedLoyaltyRewards.getBalanceInEther.call({from: this.currentAccount});
      console.log('contractBalance', contractBalance);
      this.model.balance.next(LoyaltyRewardsBalance);
      this.model.eth.next(ethBalance);
      this.contractBalance.next(contractBalance);
      this.getEmployeeCourses();
      this.getFundableEther();
    } catch (e) {
      console.error(e);
    }
  }

  async uploadCourse(name, url, date) {
    const deployedLoyaltyRewards = await this.LoyaltyRewards.deployed();
    console.log('deployedLoyaltyRewards',deployedLoyaltyRewards);
    deployedLoyaltyRewards.uploadCourse(name, url, date, {from: this.currentAccount}).then(res =>{
      this.refreshBalance()
    });
  }

  async getEmployeeCourses() {
    const deployedLoyaltyRewards = await this.LoyaltyRewards.deployed();
    let employeeTotalCourses = await deployedLoyaltyRewards.employeeTotalCourses(this.currentAccount);
    let courses = [];

    for (var i = 0; i < employeeTotalCourses.toNumber(); i++){
        let course = await deployedLoyaltyRewards.employeeCourses(this.currentAccount,i);
        courses.push(course);
    }
    this.courses.next(this.mapCourses(courses));
  }

  mapCourses(courses) {
    return courses.map(course => {
        return { 
            name: course[0], 
            url: course[1],
            date: course[2]
        }
    });
  }

  async getFundableEther() {
    const deployedLoyaltyRewards = await this.LoyaltyRewards.deployed();
    let fundableEther = await deployedLoyaltyRewards.getFundableEther({from: this.currentAccount});
    this.fundableEther.next(this.web3Service.web3.utils.fromWei(fundableEther));
  }

  async fundContract() {
    const deployedLoyaltyRewards = await this.LoyaltyRewards.deployed();
    deployedLoyaltyRewards.addBalanceToContract({from: this.currentAccount, value: 5000000000000000000}).then(res =>{
      this.refreshBalance()
    });
  }

  async claimRewards() {
    const deployedLoyaltyRewards = await this.LoyaltyRewards.deployed();
    deployedLoyaltyRewards.redeemLoyaltyPoints({from: this.currentAccount}).then(res =>{
      this.refreshBalance()
    });
  }

}
