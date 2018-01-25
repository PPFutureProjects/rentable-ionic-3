import { Component , Directive ,ViewChild } from '@angular/core';
import { Nav, NavController, NavParams } from 'ionic-angular';
import { Keyboard } from 'ionic-native';
import { AngularFireAuth } from 'angularfire2/auth';

import { AddpaymentPage } from '../addpayment/addpayment';
import { EditprofilePage } from '../editprofile/editprofile';
import { Home } from '../home/home';
import { About } from '../about/about';
import { FeedbackPage } from '../feedback/feedback';
import { LandingPage } from '../landing/landing';
import { MyStats } from '../myitem/myitem';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class Profile {

  addpayment=AddpaymentPage;
  editprofile=EditprofilePage;
  profile:any;
  home=Home;
  about=About;
  feedback=FeedbackPage;
  logout=LandingPage;
  mystats=MyStats;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth) {
    console.log("it is constructor");

    this.profile ={
      img: 'assets/img/profile-img.png', name: 'John Doe', address:'Sydney Australia', rate:'4.5', rent_nuber: '10', owner_number: '20'
    }
  }

  focusInput(input){
    input.disabled=!input.disabled;
    if(!input.disabled){
      input.setFocus();
      Keyboard.show(); // Android Mobiles
    }
  }

  gohome(){
    this.navCtrl.setRoot(Home);
  }

  gologout(){
    this.afAuth.auth.signOut();
    localStorage.setItem("uid", "");
    this.navCtrl.setRoot(LandingPage);
  }

}
