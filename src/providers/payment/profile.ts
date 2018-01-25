import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSetting } from '../api_route';

@Injectable()
export class ProfileProvider {

  apiUrl = this.appSettings.getApiURL();

  constructor(public http: Http, public appSettings: AppSetting) {
  	this.http=http;
    console.log('Hello PaymentProvider Provider');
  }

  public ChangeProfile(email, phonenumber, pasword, firstname, lastname, photourl, postalcode){
    return this.http.post(this.apiUrl+'user/update', 
      {
        email: email,
        emailVerified: "",
        phoneNumber: phonenumber,
        password: pasword,
        firstName: firstname,
        lastName: lastname,
        photoURL: photourl,
        postalCode: postalcode,
        deviceToken: "...",
      });
  }

  public Getprofile(uid){
    console.log("uid  ",   uid );
    return this.http.post(this.apiUrl+'user/single',{uid:"vB7xnImTasPbShScqNEbwFG8NT22"});
  }

  public Appfeedback(rate, leavemessage){
    console.log(" leavt", leavemessage);
    return this.http.post(this.apiUrl + "profile/feedback", {'rate': rate, 'leavemessage': leavemessage});
  }

  public Aboutinfo(uid){
    return this.http.post(this.apiUrl + "profile/about", {uid: uid});
  }

  public moneyindividual(uid){
    return this.http.post(this.apiUrl + "profil/moneyindivide" , {uid: uid});
  }

  public moneyinmonth(uid){
    return this.http.post(this.apiUrl + "profil/moneyinmonth" , {uid: uid});
  }

  public moneyinquratly(uid){
    return this.http.post(this.apiUrl + "profil/moneyinquartly" , {uid: uid});
  }

  public moneyinyear(uid){
    return this.http.post(this.apiUrl + "profil/moneyinyear" , {uid: uid});
  }

  public moneyoutindividual(uid){
    return this.http.post(this.apiUrl + "profil/moneyoutindividual" , {uid: uid});
  }

  public moneyoutmonth(uid){
    return this.http.post(this.apiUrl + "profil/moneyoutmonth" , {uid: uid});
  }

  public moneyoutquartly(uid){
    return this.http.post(this.apiUrl + "profil/moneyoutquartly" , {uid: uid});
  }

  public moneyoutyear(uid){
    return this.http.post(this.apiUrl + "profil/moneyoutyear" , {uid: uid});
  }

}