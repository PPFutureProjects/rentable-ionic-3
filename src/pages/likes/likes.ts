import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemsProvider } from '../../providers/items/items';

import { Details } from '../details/details';
import { MapPage } from '../map/map';
import { Home } from '../home/home';
import { MapModal } from '../modal-page/modal-page';
import { Profile } from '../profile/profile';
import { SearchPage } from '../search/search';
import { Myrent } from '../myrent/myrent';

@Component({
  selector: 'page-likes',
  templateUrl: 'likes.html'
})

export class Likes {

  @ViewChild(Navbar) navBar: Navbar;

  categorylist:Array<any>;
  newcategorylist:Array<any>;
  profile=Profile;
  search=SearchPage;
  details=Details;
  myrent=Myrent;
  realitems:any;
  like:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemprovider: ItemsProvider) {

    this.like = [];
    for (var i = 0; i < 12; ++i) {
      this.like[i]=false;
    }

    this.itemprovider.Getfavourity(localStorage.getItem('uid')).subscribe(data =>{
      console.log();
    }, err=>{
      console.log();
    });

    this.categorylist = [
      {img: 'assets/img/01.png', price:'21',id:'0'},
      {img: 'assets/img/02.png', price:'56',id:'1'},
      {img: 'assets/img/03.png', price:'34',id:'2'},
      {img: 'assets/img/04.png', price:'21',id:'3'},
      {img: 'assets/img/01.png', price:'15',id:'4'},
      {img: 'assets/img/02.png', price:'65',id:'5'},
      {img: 'assets/img/03.png', price:'64',id:'6'},
      {img: 'assets/img/04.png', price:'123',id:'7'},
      {img: 'assets/img/01.png', price:'21',id:'8'},
      {img: 'assets/img/02.png', price:'12',id:'9'},
      {img: 'assets/img/03.png', price:'52',id:'10'},
      {img: 'assets/img/04.png', price:'212',id:'11'}
    ]

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LikesPage');
    this.navBar.backButtonClick = () => {
      this.navCtrl.setRoot(Myrent);
    }
  }

  ActiveLike(i){
    this.like[i] = false;
  }

  UnactiveLike(i){
    this.like[i]=true;
  }

  filterItems(){
  }

}
