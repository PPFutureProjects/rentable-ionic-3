import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/payment/profile';

import { EditprofilePage } from '../editprofile/editprofile';

/**
 * Generated class for the ProfileinputPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profileinput',
  templateUrl: 'profileinput.html',
})
export class ProfileinputPage {

	editprofile=EditprofilePage;
	data:any;
  formtype:any;
  firstname:any;
  lastname:any;
  email:any;
  phonenumber:any;
  password:any;
  postalcode:any;
  type:any;
  imageURI:any;
  imageFileName:any;
  uuid:any;
  Profiledata:any;
  photourl:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public profileprovier: ProfileProvider) {
    this.formtype=navParams.get("type");
    this.data=navParams.get("data");
    this.uuid=localStorage.getItem('uid');
    this.Profiledata=this.profileprovier.Getprofile(this.uuid).subscribe(data =>{
      this.firstname=data.json().result.firstName;
      this.lastname=data.json().result.lastName;
      this.email=data.json().result.email;
      this.phonenumber=data.json().result.phoneNumber;
      this.postalcode=data.json().result.postalCode;
      this.password=data.json().result.fireId;
      this.photourl=data.json().result.photoURL;
    },
    err =>{
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileinputPage');
  }

  removetext(){
  	this.data="";
  }

  save(){
    // this.profileprovier.ChangeProfile(this.formtype, this.data).subscribe(data =>{
    //   console.log(data);
    // })
    if(this.formtype =="FIRST NAME"){
      this.firstname=this.data;
    }
    if(this.formtype =="LAST NAME"){
      this.lastname=this.data;
    }
    if(this.formtype =="MOBILE NUMBER"){
      this.phonenumber=this.data;
    }
    if(this.formtype =="EMAIL"){
      this.email=this.data;
    }
    if(this.formtype =="PASSWORD"){
      this.password=this.data;
    }
    if(this.formtype =="POSTAL CODE"){
      this.postalcode=this.data;
    }
    this.profileprovier.ChangeProfile(this.email, this.phonenumber, this.password, this.firstname, this.lastname, this.photourl, this.postalcode).subscribe(
      data=>{
        alert("success update");
        this.navCtrl.popTo(EditprofilePage);
      },err =>{
        alert("error");
      });
  	
  }

}
