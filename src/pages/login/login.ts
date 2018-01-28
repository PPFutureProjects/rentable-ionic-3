import { Component } from '@angular/core';
import { NavController, AlertController,NavParams,ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Device } from '@ionic-native/device';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
//import {FCM, NotificationData} from "@ionic-native/fcm";


import { Register } from '../register/register';
import { Home } from '../home/home';
import { TabPage } from '../tab/tab';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  expanded: Boolean;
  register = Register ;
  name:String;
  password:any;
  email:any;
  tabBarElement:any;
  type:any;
  token:any;
  phonenumber:any;
  constructor
  (
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams:NavParams,
    public afAuth: AngularFireAuth,
    private device: Device,
    public authporvider: AuthenticateProvider,
    public toastCtrl:ToastController
  ) {

    this.expanded = true;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.phonenumber=navParams.get("pnumber");
    this.name=navParams.get("pname");
    // this.fcm.getToken()
    //   .then((token:string)=>{
    //     this.token=token;
    //   })
    //   .catch(error=>{
    //     //ocurrió un error al procesar el token
    //     console.error(error);
    //   });
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


  /*
  method to log in user
  */
  login(){

      console.log(this.phonenumber+" |"+this.password);
      
      this.authporvider.login(this.phonenumber,this.password).subscribe(data=>{
          //here we get the reponse
          console.log(data);
          if(data.json().msg=="success"){
            this.navCtrl.setRoot(TabPage);
          }

          if(data.json().msg=="error"){
            this.showToastWithCloseButton("Invalid login details");
          }

      },
      err=>{
          //error
      }
      );

  }
  /*
  old method to login with firebase
  */
  loginOld() {
    this.navCtrl.setRoot(TabPage);
    this.type = this.device.platform;
   
    console.log('device type  ',this.type);
    console.log(this.email);

    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(data => {
      localStorage.clear();
      localStorage.setItem('uid', data.uid);
      this.authporvider.sendtoken(data.uid, this.token, this.device).subscribe(data =>{
        this.navCtrl.setRoot(TabPage);
      });
    }, err => {
      console.log('login Error =--', err);
    });

  }


  forgotPassword() {

    let prompt = this.alertCtrl.create({
      title: 'Forgot Password',
      message: "Enter your email address and we'll help you reset your password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {

            //send password reset code to email
            this.authporvider.sendForgetCode(data.email).subscribe(res=>{
              console.log(res);
                if(res.json().msg=="success"){
                  this.showToastWithCloseButton("Reset code has been sent to "+data.email);
                   this.navCtrl.push("ForgetpassswordPage",{
                       email:data.email
                   });

                }
                
                if(res.json().msg=="error"){
                  this.showToastWithCloseButton(res.json().msg_details);
                }
            },
            err=>{
                this.showToastWithCloseButton("Please try again later");
            }
            )
          }
        }
      ]
    });
    prompt.present();
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
