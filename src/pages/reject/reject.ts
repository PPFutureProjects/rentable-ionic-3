import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Postitemprovider } from '../../providers/items/postitem';
import { RentPage } from '../rent/rent';

/*
  Generated class for the RejectPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reject',
  templateUrl: 'reject.html'
})
export class RejectPage {

  rent=RentPage;
  isremove:boolean;
	tracks: Array<{name: string, isChecked: boolean}> = [];
  rejectreason:Array<any>;
  rejectimage:Array<any>;
  reject:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public postitemprovider: Postitemprovider) {
    this.isremove=false;
    this.rejectreason = [{reason: 'Item is broken', icon: 'ios-bug-outline'}, {reason: 'I am away', icon: 'ios-plane-outline'}, {reason: 'Item is broken', icon: 'ios-plane-outline'}, {reason: 'I am away', icon: 'ios-plane-outline'}, {reason: 'I am away', icon: 'ios-plane-outline'}, {reason: 'I am away', icon: 'ios-plane-outline'}]
    this.rejectimage = [{img: 'assets/icon/reject-imaway.png', activeimg: 'assets/icon/reject-imaway-active.png'}, {img: 'assets/icon/reject-itembroken.png', activeimg: 'assets/icon/reject-itembroken-active.png'}, {img: 'assets/icon/reject-itemfixed.png', activeimg: 'assets/icon/reject-itemfixed-active.png'}, {img: 'assets/icon/reject-itemunavailable.png', activeimg: 'assets/icon/reject-itemunavailable-active.png'}]

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RejectPagePage');
  }

  myFunction(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var element = event.srcElement;
    console.log(element);
    var parent = event.srcElement.parentElement;
    console.log(parent);
    var preparent = parent.parentElement;
    console.log(preparent);
    var children = preparent.children;
    var count = children.length;
    console.log(count + element);
    for (var i = 0; i < count; ++i) {
      if(parent==children[i]){
        var image=this.rejectimage[i].activeimg;
        this.reject=this.rejectreason[i].reason;
        console.log(children[i]);
        console.log(i+ "i");
        children[i].getElementsByTagName('img')[0].setAttribute("src", image);
      }
      else{

        var inactiveimage=this.rejectimage[i].img;
        console.log(children[i].getElementsByTagName('img')[0] + "children");
        children[i].getElementsByTagName('img')[0].setAttribute("src", inactiveimage);
      }
    }
  }

  gorequest(){
    this.navCtrl.pop();
  }

  Rejectsubmit(){
    this.postitemprovider.rejectitem(this.isremove, this.reject).subscribe(data=>{
      console.log(data);
    })
  }

}
