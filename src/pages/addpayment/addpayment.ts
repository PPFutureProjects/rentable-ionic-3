import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PaypalPage } from '../paypal/paypal';
import { CreditPage } from '../credit/credit';
import { Profile } from '../profile/profile';
import { PayPage } from '../stripe/pay/pay';

/*
  Generated class for the AddpaymentPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-addpayment',
  templateUrl: 'addpayment.html'
})
export class AddpaymentPage {

	credit=CreditPage;
	paypal=PaypalPage;
  profile=Profile;
  stripe=PayPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpaymentPagePage');
  }

}
