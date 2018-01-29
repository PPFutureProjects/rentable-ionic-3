import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { LandingPage } from '../landing/landing'
/**
 * Generated class for the ForgetpassswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgetpasssword',
  templateUrl: 'forgetpasssword.html',
})
export class ForgetpassswordPage {

	email:any;
	code:any;
	newpass:any;
	conpass:any;
	forgetForm:FormGroup;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authprovier: AuthenticateProvider,
    public toastCtrl:ToastController) {

    let PASSWORD_REGEXP=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/i;

  	this.forgetForm = formBuilder.group({
      code: ['', Validators.compose([Validators.maxLength(4), Validators.minLength(4), Validators.required])],
      newpass: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(10), Validators.pattern(PASSWORD_REGEXP),Validators.required])],
      conpass: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(30), Validators.required])],
    },{validator: this.matchingPasswords('newpass', 'conpass')});


  	this.email=this.navParams.get("email");
    this.code=this.forgetForm.controls['code'];
    this.newpass=this.forgetForm.controls['newpass'];
    this.conpass=this.forgetForm.controls['conpass'];


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpassswordPage');
    
  }

forgetPassword(){
	console.log(this.code.value);
	console.log(this.newpass.value);
	console.log(this.conpass.value);	
	console.log(this.email);
	this.authprovier.resetForgetPassword(this.email,this.code.value,this.newpass.value,this.conpass.value).subscribe(data=>{

			console.log(data);
			if(data.json().msg=="success"){
					this.showToast(data.json().msg_details);
					this.navCtrl.push(LandingPage);
			}

			if(data.json().msg=="error"){
				this.showToast(data.json().msg_details);
			}
	},
	err=>{

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


showToast(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: "top"
    });

    toast.present(toast);
  }
}
