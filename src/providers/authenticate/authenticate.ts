import { Injectable, Inject } from '@angular/core';
import { Http,Headers,RequestOptions,URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSetting } from '../api_route';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';


@Injectable()
export class AuthenticateProvider {

  apiUrl = this.appSettings.getApiURL();
  
  constructor(public http: Http, 
    public appSettings: AppSetting, 
    public local: Storage) {
    this.http = http;
    // code...
  }


  /*
    Method to send verification code
    input=
  */
  public Sendsms(smsnumber) {
    console.log(smsnumber);
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('action', 'SendSMSVerification');
    urlSearchParams.append('PhoneNumber', smsnumber);

    return this.http.post(this.apiUrl,urlSearchParams);

    //return this.http.post(this.apiUrl, {'action':'SendSMSVerification','phoneNumber': smsnumber});
  }

    /*
    Method to verify registered number with otp code
    input=
  */
  public smsverify(smsnumber, otpcode){
    console.log("auth sms verify");
    console.log(smsnumber);

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('action', 'smsverify');
    urlSearchParams.append('phoneNumber', smsnumber);
    urlSearchParams.append('code',otpcode);

    return this.http.post(this.apiUrl,urlSearchParams);

    //return this.http.post(this.apiUrl, {'action':'smsverify','phoneNumber': smsnumber, 'code':digitcode});

  }

  public sendtoken(uid, token,type ){
    return this.http.post(this.apiUrl+'user/device', {'fireId': uid, 'deviceToken': token,'deviceType': type} );
  }

  public getalluser() {
    return this.http.get(this.apiUrl+'user/all');
  }

  /*
  User sign up
  Input=finishsign.ts
  */
  public signup(Usersignup){
    console.log("sign up");
    //console.log("uuid="+Usersignup.uuid);
    console.log(Usersignup );
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('action','SignUp');
    urlSearchParams.append('email', Usersignup.email);
    urlSearchParams.append('emailVerified', "false");
    urlSearchParams.append('phoneNumber', Usersignup.phonenumber);
    urlSearchParams.append('password', Usersignup.password);
    urlSearchParams.append('firstName', Usersignup.firstname);
    urlSearchParams.append('lastName', Usersignup.lastname);
    urlSearchParams.append('postalCode', Usersignup.postalcode);
    urlSearchParams.append('deviceToken', "abaadd");
    urlSearchParams.append('deviceType','android')

    console.log(urlSearchParams);



    return this.http.post(this.apiUrl,urlSearchParams);

   /* return this.http.post(this.apiUrl, {
      email: Usersignup.email ,
      phoneNumber: Usersignup.phonenumber ,
      password: Usersignup.password,
      firstName: Usersignup.firstname,
      lastName:Usersignup.lastname ,
      postalCode: Usersignup.postalcode,
      deviceToken:Usersignup.uuid
    });*/
    
  }

  /*
  Check phone number exist or not
  Inputs=landing.ts
  */
  public phoneverify(phonenumber){
    
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('action', 'GetUserByPhone');
    urlSearchParams.append('PhoneNumber', phonenumber);

    return this.http.post(this.apiUrl,urlSearchParams);

  }

  /*
    Login with number and password
    Call:login.ts
  */
  public login(phonenumber,password){

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('action', 'SignIn');
    urlSearchParams.append('phoneNumber', phonenumber);
    urlSearchParams.append('password', password);

    return this.http.post(this.apiUrl,urlSearchParams);
  }

  /*
    Send forget password code
    Call:login.ts
    params:email
  */
 public sendForgetCode(email){

    console.log("SendCode="+email);
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('action', 'ForgotPassword');
    urlSearchParams.append('email', email);

    return this.http.post(this.apiUrl,urlSearchParams);
  }

  public resetForgetPassword(email,code,newpass,conpass){

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('action', 'VerifyForgetCode');
    urlSearchParams.append('email', email);
    urlSearchParams.append('code', code);
    urlSearchParams.append('new_password', newpass);
    urlSearchParams.append('confirm_password', conpass);

    console.log(URLSearchParams);
    return this.http.post(this.apiUrl,urlSearchParams);

  }


}