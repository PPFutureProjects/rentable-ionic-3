import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddpaymentPage } from '../addpayment/addpayment';


/*
  Generated class for the PaypalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-paypal',
  templateUrl: 'paypal.html'
})
export class PaypalPage {

	addpayment=AddpaymentPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaypalPagePage');
  }

}
