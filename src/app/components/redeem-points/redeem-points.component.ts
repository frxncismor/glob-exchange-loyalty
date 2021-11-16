import { Component, OnInit } from '@angular/core';
import { TokenService } from './../../util/token.service';

@Component({
  selector: 'app-redeem-points',
  templateUrl: './redeem-points.component.html',
  styleUrls: ['./redeem-points.component.css']
})
export class RedeemPointsComponent implements OnInit {

  model = {
    tokenPoints: 0,
    ethRewards: 0
  };

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.tokenService.tokensBalance$.subscribe((tokenBalance: any) => {
      this.model.tokenPoints = parseInt(tokenBalance);
    });
    this.tokenService.fundableEther$.subscribe(res => {
      this.model.ethRewards = res;
    });
  }

  claim() {
    this.tokenService.claimRewards();
    this.tokenService.refreshBalance();
  }

  

}
