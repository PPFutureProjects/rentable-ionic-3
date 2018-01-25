import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl  } from '@angular/forms';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';

import { Home } from '../home/home';
import { SignupPage } from '../signup/signup';
import { FinishsignPage } from '../finishsign/finishsign';



@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AuthenticateProvider]
})
export class Register {

  signup = SignupPage;
  finishsign=FinishsignPage;
  digitcode:AbstractControl;
  Usersignup:any;
  formgroup: FormGroup;
  phonenumber:any;
  tabBarElement:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public Authprovider: AuthenticateProvider,
    public toastCtrl:ToastController
    ) {

  	this.formgroup = formBuilder.group({
        digitcode: ['', Validators.compose([Validators.required, Validators.minLength(4) ])]
    });
    this.Usersignup=[];
    this.digitcode=this.formgroup.controls['digitcode'];
    this.phonenumber=navParams.get("pnumber");
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewWillEnter() {
    if(this.tabBarElement){
      this.tabBarElement.style.display = 'none';
    }
  }
 
  ionViewWillLeave() {
    if(this.tabBarElement){
      this.tabBarElement.style.display = 'flex';
    }
  }

  gosignup(){

    /*this.Usersignup.phonenumber = this.phonenumber;
    this.Authprovider.smsverify(this.phonenumber,this.digitcode.value).subscribe(data => {
      let res = data.json().success;
      console.log('hehe', res);
      
      if(!res)
        alert('Please reenter your sms code');
      else
        this.navCtrl.push(SignupPage,{
          user: this.Usersignup
        });
    });*/
    


    this.Usersignup.phonenumber=this.phonenumber;
    this.Authprovider.smsverify(this.phonenumber,this.digitcode.value).subscribe(
      data=>{
        if(data.json().msg=="success"){
           this.navCtrl.push(SignupPage,{
             user:this.Usersignup
           })
        }
        
        if(data.json().msg=="error"){
          this.showToastWithCloseButton("Invalid otp");
        }

      },

      err=>{

      },

      ()=>{

      }

      );

  
    
  }

  showToastWithCloseButton(msg:string) {
     const toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

}
