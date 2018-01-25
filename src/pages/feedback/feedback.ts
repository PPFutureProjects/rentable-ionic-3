import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/payment/profile';

import { Profile } from '../profile/profile';


/**
 * Generated class for the FeedbackPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

	profile=Profile;
  goodcondition:any;
  condition:number[] = [0,1, 2, 3, 4];
  titlenumber:any;
  feedbacktext:any;
  appfeedback:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public profileprovider: ProfileProvider) {

		this.goodcondition=[];
	  for (var i = 0; i < 5; ++i) {
	    this.goodcondition[i]=false;
	  }

	  this.titlenumber=300;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  changecondition(i){
    console.log(i, "id");
    for (var j = 0; j <= i; ++j) {
      this.goodcondition[j]=true;
    }
    for (var l = i+1; l <= 5; ++l) {
      this.goodcondition[l]=false;
    }
    this.appfeedback=i;
  }

  number(){
    var n=this.feedbacktext.length;
    this.titlenumber=400-n;
  }

  submit(){
    this.profileprovider.Appfeedback(this.appfeedback, this.feedbacktext).subscribe(data =>{
      console.log(data);
    }, err=> {
      console.log(err);
    });
  }

}
