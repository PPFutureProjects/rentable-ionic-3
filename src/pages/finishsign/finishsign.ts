import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { FormBuilder, Validators,FormGroup,FormControl } from '@angular/forms';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';

import { TabPage } from '../tab/tab';
import { SignupPage } from '../signup/signup';
import { Register } from '../register/register';

@Component({
  selector: 'page-finishsign',
  templateUrl: 'finishsign.html'
})
export class FinishsignPage {

	home=TabPage;
  signup=SignupPage;
  register=Register;
  Usersignup:any;
  finishsignupform:FormGroup;
  firstname:any;
  lastname:any;
  postalcode:any;
  tabBarElement:any;
  termaccepted:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authprovier: AuthenticateProvider,
    public toastCtrl:ToastController
  ) {
    this.finishsignupform = formBuilder.group({
      firstname: ['', Validators.compose([Validators.maxLength(50), Validators.minLength(3), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(50), Validators.minLength(3), Validators.required])],
      postalcode: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(10), Validators.required])],
      termaccepted:[false,Validators.compose([this.isChecked,Validators.required])]
    });
    this.Usersignup=navParams.get("user");
    this.firstname=this.finishsignupform.controls['firstname'];
    this.lastname=this.finishsignupform.controls['lastname'];
    this.postalcode=this.finishsignupform.controls['postalcode'];
    this.termaccepted=this.finishsignupform.controls['termaccepted'];
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinishsignPagePage');
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

  finishsignup(){

    this.Usersignup.firstname=this.firstname.value;
    this.Usersignup.lastname=this.lastname.value;
    this.Usersignup.postalcode=this.postalcode.value;
    this.authprovier.signup(this.Usersignup).subscribe(data=>{
      console.log(data);

      if(data.json().msg=="success"){
        this.navCtrl.setRoot(TabPage);
      }
      
      //localStorage.clear();
      //localStorage.setItem('uid', data.json().result.uid);
      //this.navCtrl.push(TabPage);
    },
    err => {
      this.showToastWithCloseButton("Please try again later");
    });
    

   /* this.Usersignup.firstname=this.firstname.value;
    this.Usersignup.lastname=this.lastname.value;
    this.Usersignup.postalcode=this.postalcode.value;
    this.authprovier.signup(this.Usersignup);
    this.navCtrl.push(TabPage);
   */
  }

  /*
    Method to display toast message
  */
  showToastWithCloseButton(msg:string) {
     const toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: "top"
    });
    toast.present();
  }

  //function to chek whether checkbox checked or not
  isChecked(control: FormControl) : any{

    if(control.value != true){
      return {
        "notChecked" : true
      };
    }

    return null;
  }
}
