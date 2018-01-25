import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ClaimrenterPage } from '../claimrenter/claimrenter';
import { Details } from '../details/details';


/**
 * Generated class for the ClaimownerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-claimowner',
  templateUrl: 'claimowner.html',
})
export class ClaimownerPage {

	itemtitle:any;
	titlenumber:any;
	detail=Details;
  claimrenter=ClaimrenterPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	this.titlenumber=350;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClaimownerPage');
  }

  number(){
    var n=this.itemtitle.length;
    this.titlenumber=350-n;
  }

}
