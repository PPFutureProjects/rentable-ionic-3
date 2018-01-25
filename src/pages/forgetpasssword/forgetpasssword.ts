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

  	this.forgetForm = formBuilder.group({
      code: ['', Validators.compose([Validators.maxLength(50), Validators.minLength(3), Validators.required])],
      newpass: ['', Validators.compose([Validators.maxLength(50), Validators.minLength(10), Validators.required])],
      conpass: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(10), Validators.required])]
    });

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


showToast(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: "bottom"
    });

    toast.present(toast);
  }
}
