import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';

import { Likes } from '../likes/likes';      //favourites screen
import { Details } from '../details/details';


@Component({
  selector: 'page-myrent',
  templateUrl: 'myrent.html'
})
export class Myrent {

  own_avaiablelist: Array<any>;
  own_rentedlist: Array<any>;
  rent_currentlist: Array<any>;
  rent_historylist: Array<any>;
  own_like:any;
  rent_like:any;

  own_rent:string="own";
  date:string="current";
  isavailable:string="available";
  showdeleteicon:boolean;
  public ownshowwhite = false;
  public rentshowwhite = false;

  favourites=Likes;
  details=Details;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public itemprovider: ItemsProvider) {

    this.showdeleteicon=true;

    this.rent_like = [];
    for (var i = 0; i < 4; ++i) {
      this.rent_like[i]=false;
    }

    this.own_like = [];
    for (var i = 0; i < 4; ++i) {
      this.own_like[i]=false;
    }

    this.itemprovider.Getownavailable(localStorage.getItem('uid')).subscribe(data=>{
      console.log(data.json().result);  
    }, err=>{
      console.log(err);
    });

    this.itemprovider.Getownrent(localStorage.getItem('uid')).subscribe(data=>{
      console.log(data.json().result);  
    }, err=>{
      console.log(err);
    });

    this.itemprovider.Getrentcurrent(localStorage.getItem('uid')).subscribe(data=>{
      console.log(data.json().result);  
    }, err=>{
      console.log(err);
    });

    this.itemprovider.Getrentcurrent(localStorage.getItem('uid')).subscribe(data=>{
      console.log(data.json().result);  
    }, err=>{
      console.log(err);
    });

    this.own_avaiablelist =
    [
      {img: 'assets/img/11.png', title: 'John', view:'10', favourity:'20', id:'0'},
      {img: 'assets/img/22.png', title: 'alex', view:'10', favourity:'20', id:'1'},
      {img: 'assets/img/33.png', title: 'eric', view:'10', favourity:'20', id:'2'},
      {img: 'assets/img/11.png', title: 'kevin', view:'10', favourity:'20' ,id:'3'},
    ]

    this.own_rentedlist =
    [
      {img: 'assets/img/11.png', title: 'apartment', profileimage:'assets/img/profile-img.png', profilename:'John', delete:'yes', rentday:'5'},
      {img: 'assets/img/22.png', title: 'wedding', profileimage:'assets/img/profile-img.png', profilename:'rascal', delete:'yes',  rentday:'2'},
      {img: 'assets/img/33.png', title: 'shop', profileimage:'assets/img/profile-img.png', profilename:'sizza', delete:'yes', rentday:'3' },
      {img: 'assets/img/22.png', title: 'wedding', profileimage:'assets/img/profile-img.png', profilename:'rascal', delete:'yes',  rentday:'2'},
      {img: 'assets/img/33.png', title: 'shop', profileimage:'assets/img/profile-img.png', profilename:'sizza', delete:'yes', rentday:'3' }
    ]

    this.rent_currentlist =
    [
      {img: 'assets/img/11.png', title: 'John', view:'43', favourity:'40',unlike:'assets/icon/like.png',like:'assets/icon/like-full.png',islike:'false', id:'0'},
      {img: 'assets/img/22.png', title: 'jens', view:'234', favourity:'50',unlike:'assets/icon/like.png',like:'assets/icon/like-full.png',islike:'false', id:'1'},
      {img: 'assets/img/33.png', title: 'eric', view:'12', favourity:'26',unlike:'assets/icon/like.png',like:'assets/icon/like-full.png',islike:'false', id:'2'},
      {img: 'assets/img/11.png', title: 'daniel', view:'52', favourity:'23',unlike:'assets/icon/like.png',like:'assets/icon/like-full.png',islike:'false', id:'3'},
    ]

    this.rent_historylist =
    [
      {img: 'assets/img/11.png', title: 'apartment', profileimage:'assets/img/profile-img.png', profilename:'John', delete:'yes', rentday:'5' },
      {img: 'assets/img/22.png', title: 'wedding', profileimage:'assets/img/profile-img.png', profilename:'rascal', delete:'yes',  rentday:'3'},
      {img: 'assets/img/33.png', title: 'shop', profileimage:'assets/img/profile-img.png', profilename:'sizza', delete:'yes', rentday:'2' }
    ]
  }


  showdelete(){
    if (this.own_rent=="own") {
      if (this.isavailable=="available") {
        this.showdeleteicon=true;
      }
      if(this.isavailable=="rented"){
        this.showdeleteicon=false;
      }
    }
    if(this.own_rent=="rent"){
      this.showdeleteicon=false;
    }
  }

  ownshowheart(i) {
   this.own_like[i]=!this.own_like[i];
  }
  rentshowheart(i) {
    this.rent_like[i] = !this.rent_like[i];
  }
}
