import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, LoadingController  } from 'ionic-angular';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { Device } from '@ionic-native/device';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { FinishsignPage } from '../finishsign/finishsign';
import { Register } from '../register/register';

import { AuthenticateProvider } from '../../providers/authenticate/authenticate';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

	finishsign=FinishsignPage;
  register=Register;
  email: any;
  password: any;
  confirmpassword:any;
  registerForm:FormGroup;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  fullnameChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  Usersignup:any;
  uuid:any;
  tabBarElement:any;
  showFb:boolean;
  //fb test
  users:any;
  firstName:any;
  lastName:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public Authprovider: AuthenticateProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private device: Device,
    private fb: Facebook
  ) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    let PASSWORD_REGEXP=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/i;
    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP),Validators.maxLength(80)])],
      password: ['', Validators.compose([Validators.maxLength(10),Validators.minLength(10), Validators.required,Validators.pattern(PASSWORD_REGEXP)])],
      confirmpassword: ['',Validators.required],
    },{validator:this.matchingPasswords('password','confirmpassword')});

    this.Usersignup=navParams.get("user");
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.showFb=false;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPagePage');
    this.email=this.registerForm.controls['email'];
    this.password=this.registerForm.controls['password'];
    this.confirmpassword=this.registerForm.controls['confirmpassword'];
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

  elementChanged(input){
    let field = input.inputControl;
    this[field + "Changed"] = true;
  }

  facebook(){

  }

  doRegister(){

  /*    this.Usersignup.email=this.email.value;
      this.Usersignup.password=this.password.value;
      this.uuid=this.device.uuid;

      console.log('device token',this.uuid);
      console.log(this.Usersignup.phonenumber);
    this.navCtrl.setRoot(FinishsignPage,{
      user:this.Usersignup
    });*/
    this.Usersignup.id=0;
    this.Usersignup.email=this.email.value;
    this.Usersignup.password=this.password.value;
    this.navCtrl.setRoot(FinishsignPage,{
      user:this.Usersignup
    });
  }

  //Method to register with facebook 
  doRegisterWithFb(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res=>{
         if(res.status=="connected"){
           this.showFb=true;
           this.getUserDetail(res.authResponse.userID);
         }

      })
      .catch(e => console.log('Error logging into Facebook', e));
      
      this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }


getUserDetail(userid) {

  this.fb.api("/"+userid+"/?fields=id,email,name,first_name,last_name,picture,gender",["public_profile"])
    .then(res => {
    
    this.users=res;
    this.Usersignup.id=1;
    this.Usersignup.email=this.users.email;
    this.Usersignup.password=this.password.value;
    this.Usersignup.firstName=this.users.first_name;
    this.Usersignup.lastName=this.users.last_name;

    this.navCtrl.setRoot(FinishsignPage,{
      user:this.Usersignup
    });

      
    })
    .catch(e => {
      console.log(e);
    });
}


matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }



}
