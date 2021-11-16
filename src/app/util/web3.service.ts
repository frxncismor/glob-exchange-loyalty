import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import detectEthereumProvider from '@metamask/detect-provider';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../components/modal/modal.component';

declare let require: any;
const Web3 = require('web3');
const contract = require('@truffle/contract');

declare let window: any;

@Injectable()
export class Web3Service {
  public web3: any;
  private accounts: string[];
  public ready = false;
  public accountsObservable = new Subject<string[]>();
  public modal = new BehaviorSubject(false);

  public modal$ = this.modal.asObservable();

  constructor(public dialog: MatDialog) {
    window.addEventListener('load', (event) => {
      this.bootstrapWeb3();
    });
  }

  async bootstrapWeb3() {
    const provider: any = await detectEthereumProvider();
    console.log('provider',provider)
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (provider) {
      // Use Mist/MetaMask's provider
      provider.enable().then(async () => {
        this.web3 = new Web3(provider);
        this.modal.next(false);
        let chainId = await provider.chainId;
        if(chainId !== "0x539" && chainId !== "0x4") {
          this.openDialog('network');
        }
      });
    } else {
      console.log('No web3? You should consider trying MetaMask!');
      this.openDialog('metamask');
      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    setInterval(() => this.refreshAccounts(), 100);
  }

  public async artifactsToContract(artifacts) {
    if (!this.web3) {
      const delay = new Promise(resolve => setTimeout(resolve, 100));
      await delay;
      return await this.artifactsToContract(artifacts);
    }

    const contractAbstraction = contract(artifacts);
    contractAbstraction.setProvider(this.web3.currentProvider);
    return contractAbstraction;

  }

  private async refreshAccounts() {
    const accs = await this.web3.eth.getAccounts();
      // Get the initial account balance so it can be displayed.
    if (accs.length === 0) {
      console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
      return;
    }
    if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
      this.accountsObservable.next(accs);
      this.accounts = accs;
      console.log('this.accounts',this.accounts)
    }

    this.ready = true;
  }

  openDialog(value): void {
    if(value === 'metamask') {
      this.dialog.open(ModalComponent, {
        data: {
          title: 'No se detecta Metamask',
          content: 'Por favor instala Metamask, sin el no podrás interactuar',
        }
      });
    } else if (value === 'network') {
      this.dialog.open(ModalComponent, {
        data: {
          title: 'Conectate a la red de Rinkeby',
          content: 'Por favor verifica que estas conectado a la red de Rinkeby',
        }
      });
    }
  }
}
