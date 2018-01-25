import { Component,Renderer, ElementRef } from '@angular/core';
import { NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';
import { KeyboardDirective } from '../../directives/keyboard/keyboard';
import { File } from '@ionic-native/file';
import { ProfileProvider } from '../../providers/payment/profile';
import { storage } from 'firebase';
import firebase from 'firebase';
import { Profile } from '../profile/profile';
import { ProfileinputPage } from '../profileinput/profileinput';


/*
  Generated class for the EditprofilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html'
})
export class EditprofilePage {

	editprofile:any;
  profile=Profile;
  firstname:any;
  lastname:any;
  email:any;
  phonenumber:any;
  password:any;
  postalcode:any;
  type:any;
  showpassword:any;
  Profiledata:any;
  imageURI:any;
  imageFileName:any;
  captureurl:any;
  uuid:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profileprovider: ProfileProvider,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public device: Device
  ) {
	  this.editprofile ={
    img: 'assets/img/profile-img.png', name: 'John Doe', address:'Sydney Australia', rate:'4.5', rent_nuber: '10', owner_number: '20'
    }

    this.imageURI="assets/img/profile-img.png";

    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePagePage');
    this.uuid=localStorage.getItem('uid');
    this.Profiledata=this.profileprovider.Getprofile(this.uuid).subscribe(data =>{
      console.log(data.json().result);
      // this.firstname=data.json().result.firstName;
      // this.lastname=data.json().result.lastName;
      // this.email=data.json().result.email;
      // this.phonenumber=data.json().result.phoneNumber;
      // this.postalcode=data.json().result.phoneNubmer;
      // this.password=data.json().result.fireId;
    },
    err =>{
      console.log(err);
    });

  }

  firstfocus(){
    this.navCtrl.push(ProfileinputPage,{
      type: "FIRST NAME"
    })
   }

  lastfocus(){
    this.navCtrl.push(ProfileinputPage,{
      type: "LAST NAME"
    })
  }

  mobilefocus(){
   this.navCtrl.push(ProfileinputPage,{
      type: "MOBILE NUMBER"
    })
  }

  emailfocus(){
    this.navCtrl.push(ProfileinputPage,{
      type: "EMAIL"
    })
  }

  passwordfocus(){
     this.navCtrl.push(ProfileinputPage,{
      type: "PASSWORD"
    })
  }

  
  postalfocus(){
    this.navCtrl.setRoot(ProfileinputPage,{
      type: "POSTAL CODE"
    })
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  getImage() {
    var filename;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
      const pictures = firebase.storage().ref();
      filename =Math.floor(Date.now()/1000);
      const imageref = pictures.child('images/${filename}.jpg');
      var uploadtask = imageref.putString(imageData, 'base64').then((snapshot)=>{
        console.log("success image upload", snapshot);
      });

      const selfieRef = firebase.storage().ref('profilePictures/user1/profilePicture.png');
      selfieRef
        .putString(imageData, 'base64', {contentType: 'image/png'})
        .then(savedProfilePicture => {
          firebase
            .database()
            .ref(`users/user1/profilePicture`)
            .set(savedProfilePicture.downloadURL);
        });

    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });

    // this.profileprovider.ChangeProfile(this.email, this.phonenumber, this.password, this.firstname, this.lastname, filename, this.postalcode).subscribe(
    //   data=>{
    //     alert("success update");
    //     this.navCtrl.popTo(EditprofilePage);
    //   },err =>{
    //     alert("error");
    //   });
  }


 

}
