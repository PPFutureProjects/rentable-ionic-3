import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { PostdetailPage } from '../postdetail/postdetail';
import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';
import firebase from 'firebase';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {

	postdetail=PostdetailPage;
  categorygrid: Array<any>;
  imagelist:Array<any>;
  options:any;
  photourlname:any;
  thumname:any;
  filename:any;
  takeimage:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public imagepicker: ImagePicker,
    public cropservice: Crop,
    public camera: Camera
  ) {
    this.categorygrid = [{img: 'assets/icon/camera.png', title: 'apartment', icon: 'ios-home-outline', price:'20', favourity:'21'}, {img: 'assets/img/02.png', title: 'wedding hall', icon: 'ios-bowtie-outline',price:'12', favourity:'11'}, {img: 'assets/img/03.png', title: 'shop', icon: 'ios-shirt-outline',price:'12', favourity:'34'}, {img: 'assets/img/04.png', title: 'rent', icon: 'ios-headset-outline', price:'32', favourity:'21'},{img: 'assets/img/01.png', title: 'apartment', icon: 'ios-home',price:'31', favourity:'15'}, {img: 'assets/img/02.png', title: 'wedding hall', icon: 'ios-bowtie',price:'34', favourity:'65'}, {img: 'assets/img/03.png', title: 'shop', icon: 'md-cart',price:'42', favourity:'23'}, {img: 'assets/img/04.png', title: 'rent', icon: 'md-headset',price:'20', favourity:'21'},{img: 'assets/img/01.png', title: 'apartment', icon: 'ios-home',price:'20', favourity:'21'}, {img: 'assets/img/02.png', title: 'wedding hall', icon: 'ios-bowtie',price:'20', favourity:'21'}, {img: 'assets/img/03.png', title: 'shop', icon: 'md-cart',price:'20', favourity:'21'}, {img: 'assets/img/04.png', title: 'rent', icon: 'md-headset',price:'20', favourity:'21'}]
    this.imagelist = [];

    this.imagelist=JSON.parse(localStorage.getItem('imagelist'));
    console.log('ionviewconstructuer', this.imagelist);
    // for (var i = image.length; i > 0; i--) {
    //   this.imagelist[i]=image[i];
    // }
    //this.imagelist=image;
    
  }

  takephoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then((imageData) => {
      this.takeimage = imageData;
      this.imagelist.push(imageData);
    });
    
  }

  getimage(){
    this.options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }
    var image=[];
    this.imagepicker.getPictures(this.options).then(
      file_uris => {
        image=file_uris;
        if(this.imagelist.length==0){
          this.imagelist=image;
          localStorage.setItem('imagelist',JSON.stringify(this.imagelist));
        }
        else{
          this.imagelist=this.imagelist.concat(image);
          localStorage.setItem('imagelist',JSON.stringify(this.imagelist));
        }     
      },
      err => console.log('uh oh')
    );
  }

  reduceImages(selected_pictures: any) : any{
    return selected_pictures.reduce((promise:any, item:any) => {
      return promise.then((result) => {
        return this.cropservice.crop(item, {quality: 75}).then(cropped_image => this.imagelist.push(cropped_image));
      });
    }, Promise.resolve());
  }

  gopostdetail(){
    localStorage.setItem('imagelist',JSON.stringify(this.imagelist));
    this.navCtrl.push(PostdetailPage);
  }

  ionViewDidEnter(){
    console.log('ionviewdidenter');
    localStorage.setItem('imagelist',JSON.stringify(this.imagelist));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
    //
  }

  deleteimage(n){
    for (var i = 0; i <this.imagelist.length; i++) {
      if(i==n){
        console.log('n ++', n);
        this.imagelist.splice(i, 1);
        localStorage.setItem('imagelist',JSON.stringify(this.imagelist));
      }
    }
  }

}
