import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { Coin } from '../../models/Coin';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CoinService } from '../../services/coin.service';
import { takeUntil } from 'rxjs/operators';
import { Util } from '../../util/util';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent implements OnInit, OnDestroy {

  public title = 'Coines';
  public coinSelecionado: Coin;
  private unsubscriber = new Subject();

  public coins: Coin[];

  constructor(
    private router: Router,
    private coinService: CoinService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {}
    private quantity: number = 1000;
    private myGroup: FormGroup = new FormGroup({
      value: new FormControl()
    });


  showCoins(quantity: number, isDesc: boolean) {
    this.spinner.show();
    this.coinService.getAll()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((data: Coin[]) => {
        if(isDesc) {
          data.sort((a, b) => parseFloat(a.metrics.market_data.price_usd.toString()) -
          parseFloat(b.metrics.market_data.price_usd.toString()));
        }
        else{
          data.sort((a, b) => parseFloat(b.metrics.market_data.price_usd.toString()) -
          parseFloat(a.metrics.market_data.price_usd.toString()));
        }

        const size: number = (quantity > 0 && quantity < data.length) ? quantity : data.length;

        const items = data.slice(0, size);

        this.coins = items;
        let msq_quantity: string = quantity == 1000 ? "all fetched" : quantity.toString();
        this.toastr.success(`"Information about ${msq_quantity} coins is loading successfully!"`);
      }, (error: any) => {
        this.toastr.error('Information about coins is not loading!');
        console.log(error);
      }, () => this.spinner.hide()
    );
  }

  ngOnInit() {
    console.log(this.quantity);
    this.showCoins(this.quantity, false);
  }

  modelChanged(value: number){
    this.quantity = value;
    console.log("Change " , this.quantity);
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

}
