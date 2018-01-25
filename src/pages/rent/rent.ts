import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, Navbar } from 'ionic-angular';

import { Home } from '../home/home';
import { RejectPage } from '../reject/reject';
import { AcceptPage } from '../accept/accept';
import { Details } from '../details/details';
import { Filter } from '../filter/filter';

@Component({
  selector: 'page-rent',
  templateUrl: 'rent.html'
})
export class RentPage {
  @ViewChild(Navbar) navBar: Navbar;

  home = Home;
  accept = AcceptPage;
  rentreject=RejectPage;
  detail=Details;
  condition:number[] = [0, 1, 2, 3, 4];
  goodcondition:any;
  Product: any;
  renter:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.goodcondition=[];
    for (var i = 0; i < 3; ++i) {
      this.goodcondition[i]=true;
    }
    for (var i = 3; i < 5; ++i) {
      this.goodcondition[i]=false;
    }


  	this.Product ={
      img: 'assets/img/11.png', ownerimage:'assets/img/profile-img.png', ownername: 'John', item_title:'house', price:'25', description:'this is good rentalable book', selectdate:'19/7/2017', total_cost:'100'
    }

    this.renter = {
      img: 'assets/img/profile-img.png', name: 'John', address:'Sydney Australia', rate:'4.5', rent_nuber: '10', owner_number: '20'
    }
  }

  backdetail(){
    this.navCtrl.pop();
  }

}
