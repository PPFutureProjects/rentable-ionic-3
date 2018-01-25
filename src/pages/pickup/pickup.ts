import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Details } from '../details/details';


/**
 * Generated class for the PickupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pickup',
  templateUrl: 'pickup.html',
})
export class PickupPage {

	details=Details;
  agree:any;
  togglevalue1:any;
  active_flag:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.active_flag=true;
    this.agree="no";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickupPage');
  }

  godetail(){
    this.navCtrl.pop();
  }

  radioChecked(){
    if (this.agree=="no") {
      this.active_flag=true;
    }
    else {
      this.active_flag=false;
    }
  }

}
