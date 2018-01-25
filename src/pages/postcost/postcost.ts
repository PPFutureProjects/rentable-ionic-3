import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Postitemprovider } from '../../providers/items/postitem';

import { PostdetailPage } from '../postdetail/postdetail';
import { AddPage } from '../add/add';


@Component({
  selector: 'page-postcost',
  templateUrl: 'postcost.html',
})
export class PostcostPage {

	postdetail=PostdetailPage;
  addpage=AddPage;
  deliver:any;
  fee:any;
  itempost:any;
  dailyprice:any;
  weeklyprice:any;
  fairprice:any;
  distance:any;
  uid:any;
  imageurl:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public postitemprovider: Postitemprovider) {
    this.deliver=false;
    this.itempost=navParams.get("itempost");
    this.uid=localStorage.getItem('uid');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostcostPage');
  }

  removefairprice(){
    this.fairprice="";
  }

  removeweeklyprice(){
    this.weeklyprice="";
  }

  removedailyprice(){
    this.dailyprice="";
  }

  removefee(){
    this.fee="";
  }

  backadd(){
    this.navCtrl.setRoot(AddPage);
  }

  backdetail(){
    this.navCtrl.push(PostdetailPage);
  }

  Postitem(){
    this.postitemprovider.Itemsave
    (
      this.dailyprice,
      this.distance,
      this.deliver,
      this.itempost.category,
      this.itempost.itemtitle,
      this.itempost.conditionmark,
      this.itempost.conditiontitle,
      this.imageurl,
      this.uid,
      0
    ).subscribe(data=>{
      alert('success posted item');
      this.navCtrl.push(AddPage);
    }, 
    err =>{
      alert('failed');
    });
  }

}
