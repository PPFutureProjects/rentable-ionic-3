import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {ClaimownerPage } from '../claimowner/claimowner';
import { OtherprofilePage } from '../otherprofile/otherprofile';
import { Details } from '../details/details';

/**
 * Generated class for the ClaimrenterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-claimrenter',
  templateUrl: 'claimrenter.html',
})
export class ClaimrenterPage {

  renter:any;
  Product:any;
  agree:any;
  claimowner=ClaimownerPage;
  otherprofile=OtherprofilePage;
  detail=Details;
  active_flag:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	this.Product ={
      img: 'assets/img/11.png', ownerimage:'assets/img/profile-img.png', ownername: 'John', item_title:'house', price:'25', description:'this is good rentalable book', selectdate:'19/7/2017', total_cost:'100'
    }

  	this.renter = {
      img: 'assets/img/profile-img.png', name: 'John', address:'Sydney Australia', rate:'4.5', rent_nuber: '10', owner_number: '20'
    }
    this.active_flag=true;
    this.agree="no";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClaimrenterPage');
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
