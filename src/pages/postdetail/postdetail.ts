import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';

import { PostcostPage } from '../postcost/postcost';
import { AddPage } from '../add/add';


/**
 * Generated class for the PostdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-postdetail',
  templateUrl: 'postdetail.html',
})
export class PostdetailPage {
  @ViewChild(Navbar) navBar: Navbar;

	postcost=PostcostPage;
	addpage=AddPage;
  condition:number[] = [0,1, 2, 3, 4];
  badcondition:any;
  goodcondition:any;
  categorylist:Array<any>;
  itemtitle:any;
  titlenumber:any;
  conditionnumber:any;
  conditiontitle:any;
  conditionmark:any;
  Postitem:any;
  category:any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.categorylist = [
      {active_img: 'assets/icon/cat-nearyou-red.png', title: 'Nearby', inactive_img: 'assets/icon/cat-nearyou-grey.png', value:'nearby',radionumber:'postradio1'},
      {active_img: 'assets/icon/cat-electronics-red.png', title: 'Electronics', inactive_img: 'assets/icon/cat-electronics-grey.png', value:'electronics',radionumber:'postradio2'},
      {active_img: 'assets/icon/cat-cars-red.png', title: 'Cars and motors', inactive_img: 'assets/icon/cat-cars-grey.png', value:'cars',radionumber:'postradio3'},
      {active_img: 'assets/icon/cat-sports-red.png', title: 'Sports and leisure', inactive_img: 'assets/icon/cat-sports-grey.png', value:'sports',radionumber:'postradio4'},
      {active_img: 'assets/icon/cat-home-red.png', title: 'Home and garden', inactive_img: 'assets/icon/cat-home-grey.png', value:'home',radionumber:'postradio5'},
      {active_img: 'assets/icon/cat-movies-red.png', title: 'Movies and music', inactive_img: 'assets/icon/cat-movies-grey.png', value:'movies',radionumber:'postradio6'},
      {active_img: 'assets/icon/cat-fashion-red.png', title: 'Fashion and accessories', inactive_img: 'assets/icon/cat-fashion-grey.png', value:'fashion',radionumber:'postradio7'},
      {active_img: 'assets/icon/cat-baby-red.png', title: 'Baby and child', inactive_img: 'assets/icon/cat-baby-grey.png', value:'baby',radionumber:'postradio8'},
      {active_img: 'assets/icon/cat-tools-red.png', title: 'Tools and machines', inactive_img: 'assets/icon/cat-tools-grey.png', value:'tools',radionumber:'postradio9'},
      {active_img: 'assets/icon/cat-party-red.png', title: 'Party and Events', inactive_img: 'assets/icon/cat-party-grey.png', value:'party',radionumber:'postradio10'}
    ]

    this.itemtitle="";
    this.titlenumber=80;
    this.conditiontitle="";
    this.conditionnumber=200;
    this.goodcondition=[];
    this.Postitem=[];
    this.conditionmark=0;
    for (var i = 0; i < 5; ++i) {
      this.goodcondition[i]=false;
    }
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad PostdetailPage');
    this.navBar.backButtonClick = () => {
      this.navCtrl.setRoot(AddPage);
    };
  }

  myFunction(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var parent = event.srcElement.parentElement;
    var preparent = parent.parentElement;
    var divparent = preparent.parentElement;
    var children = divparent.children;
    var count = children.length;
    for (var i = 0; i < count; ++i) {
      if(preparent==children[i]){
        this.category=this.categorylist[i].title;
        console.log(this.category);
        var image=this.categorylist[i].active_img;
        console.log(children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0] + "children[i]");
        children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0].setAttribute("src", image);
      }
      else{
        var inactiveimage=this.categorylist[i].inactive_img;
        children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0].setAttribute("src", inactiveimage);
      }
    }
  }

  number(){
    var n=this.itemtitle.length;
    this.titlenumber=80-n;
  }

  focus(){
        document.getElementById("conditiontitle").style.marginBottom="40px";

  }

  conditionnum(){
    document.getElementById("conditiontitle").style.marginBottom="40px";
    
    var n=this.conditiontitle.length;
    this.conditionnumber=200-n;
  }

  changecondition(i){
    console.log(i, "id");
    for (var j = 0; j <= i; ++j) {
      this.goodcondition[j]=true;
    }
    for (var l = i+1; l <= 5; ++l) {
      this.goodcondition[l]=false;
    }
    this.conditionmark=i;
  }

  goaddpage(){
    this.navCtrl.setRoot(AddPage);
  }

  gopostcost(){
    this.Postitem.itemtitle=this.itemtitle;
    this.Postitem.category=this.category;
    console.log(this.Postitem.category);
    this.Postitem.conditionmark=this.conditionmark;
    this.Postitem.conditiontitle=this.conditiontitle;
    this.navCtrl.push(PostcostPage,{
      itempost: this.Postitem
    });
  }

}
