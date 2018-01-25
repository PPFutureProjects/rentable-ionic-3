import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RentPage } from '../rent/rent';
import { Details } from '../details/details';

/*
  Generated class for the OtherprofilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-otherprofile',
  templateUrl: 'otherprofile.html'
})
export class OtherprofilePage {


  rent=RentPage;
  productdetail=Details;
	otherprofile:any;
  avaiablelist: Array<any>;
  postlist: Array<any>;
  isavailable:any;
  like:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.like = [];
    for (var i = 0; i < 12; ++i) {
      this.like[i]=false;
    }

  	this.otherprofile = {
      img: 'assets/img/profile-img.png', name: 'John Doe', address:'Sydney Australia', rate:'4.5', rent_nuber: '10', owner_number: '20'
    }

    this.avaiablelist =
    [
      {img: 'assets/img/11.png', title: 'John', view:'10', favourity:'20',id:'0'},
      {img: 'assets/img/22.png', title: 'John', view:'10', favourity:'20',id:'1'},
      {img: 'assets/img/33.png', title: 'John', view:'10', favourity:'20',id:'2'},
      {img: 'assets/img/11.png', title: 'John', view:'10', favourity:'20',id:'3'},
      {img: 'assets/img/22.png', title: 'John', view:'10', favourity:'20',id:'4'},
      {img: 'assets/img/33.png', title: 'John', view:'10', favourity:'20',id:'5'},
    ]

    this.postlist =
    [
      {img: 'assets/img/33.png', title: 'John', view:'10', favourity:'20',id:'0'},
      {img: 'assets/img/11.png', title: 'John', view:'10', favourity:'20',id:'1'},
      {img: 'assets/img/22.png', title: 'John', view:'10', favourity:'20',id:'2'},
      {img: 'assets/img/11.png', title: 'John', view:'10', favourity:'20',id:'3'},
      {img: 'assets/img/22.png', title: 'John', view:'10', favourity:'20',id:'4'},
      {img: 'assets/img/33.png', title: 'John', view:'10', favourity:'20',id:'5'},
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherprofilePagePage');
    this.isavailable="available";
  }

  ActiveLike(i){
    this.like[i] = !this.like[i];
  }

}
