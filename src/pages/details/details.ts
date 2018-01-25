import { Component, OnInit, ElementRef,ViewChild , NgZone  } from '@angular/core';
import { NavController, ModalController, NavParams, Content, ViewController } from 'ionic-angular';
import { RentPage } from '../rent/rent';
import { MapModal } from '../modal-page/modal-page';
import { ShareModal } from '../share-modal/share-modal';
import { Home } from '../home/home';
import { ItemsProvider } from '../../providers/items/items';
import { Geolocation} from 'ionic-native';
import { ChatProvider } from '../../providers/chat/chat';

import { AcceptPage } from '../accept/accept';
import { PickupPage } from '../pickup/pickup';
import { ClaimrenterPage } from '../claimrenter/claimrenter';
import { ClaimownerPage } from '../claimowner/claimowner';
import { OtherprofilePage } from '../otherprofile/otherprofile';
import { ChatdetailPage } from '../chatdetail/chatdetail';

declare var google;

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class Details implements OnInit {

  @ViewChild(Content) content: Content;
  @ViewChild("contentRef") contentHandle: Content;

  showFooter= false;
  rentPage = RentPage;
  home=Home;
  claim=ClaimownerPage;
  pickup=PickupPage;
  otherprofile=OtherprofilePage;
  private topOrBottom: String;
  private contentBox;
  private tabBarHeight;
  like: any;
  Product:any;
  descriptionstatus: boolean = true;
  rentalstatus: boolean = false;
  locationstatus: boolean = false;
  rent=RentPage;
  retrun=AcceptPage;  //return process
  messagenumber:any;
  messagetext:any;
  detailitem:any;
  itemconditiontext:any;
  itemgoodcondition:any;
  itembadcondition:any;
  goodcondition:any;
  badcondition:any;
  price:any;
  uid:any;
  fullname:any;
  date:any;
  itemowner:any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public myElement: ElementRef,
    public modalCtrl: ModalController,
    public zone:NgZone,
    public viewCtrl: ViewController,
    public itemprovider: ItemsProvider,
    public chatprovider: ChatProvider
    )  {
    // this.Product ={
    //   img: 'assets/img/11.png', ownerimage:'assets/img/profile-img.png', ownername: 'John', item_title:'house', price:'25', description:'this is good rentalable book please use this Thanks', selectdate:'', total_cost:'100'}
    this.detailitem=navParams.get("itemid");
    this.uid=localStorage.getItem('uid');
    console.log(this.uid);

    this.Product=[];
    this.ionViewLoaded();
    this.messagetext="";
    this.messagenumber=350;
    this.itemgoodcondition=[];
    this.itembadcondition=[];
    this.itemprovider.Getitemdetail(this.detailitem ).subscribe(data=>{
      this.Product=data.json().result.item;
      this.itemowner=data.json().result.user;
      this.uid = this.itemowner._id;
      //this.fullname = data.json().result.user.firstName + " " + data.json().result.user.lastName;
      this.fullname="john bell";
      console.log('owner',this.itemowner);
      for (var i=0; i < this.Product.condition;  i++) {
        this.itemgoodcondition[i]=i;
      }
      for (var j=0; j < 5-this.Product.condition;  j++) {
        this.itembadcondition[j]=j;
      }
      if(this.Product.condition<=1)
      {
        this.itemconditiontext = "POOR";
      }
      if(this.Product.condition==2)
      {
        this.itemconditiontext = "FAIR";
      }
      if(this.Product.condition==3)
      {
        this.itemconditiontext = "GOOD";
      }
      if(this.Product.condition==4)
      {
        this.itemconditiontext = "VERY GOOD";
      }
      if(this.Product.condition==5)
      {
        this.itemconditiontext = "EXCELLENT";
      }

    }, 
    err =>{
      console.log(err);
    });

  }

  ionViewLoaded(){
    this.loadMap();
  }

  loadMap(){
  }

  number(){
    var n=this.messagetext.length;
    this.messagenumber=350-n;
  }

  backicon(){
    this.navCtrl.pop();
  }

  sendrental(){
    this.navCtrl.push(RentPage);
    this.itemprovider.SendRental(this.uid, this.detailitem, this.date, this.price ).subscribe(date =>{
      console.log(date);
    }, err =>{

    });
  }

  sendmessage(){
    this.chatprovider.addChats(this.uid, this.itemowner._id);
    console.log('id-----',this.itemowner._id);
    let param = {uid: this.uid, interlocutor: this.itemowner._id, message: this.messagetext};
    this.navCtrl.push(ChatdetailPage,param);
  }

  addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    let content = "<h4>Information!</h4>";
    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  ngOnInit(){
    this.toggle_footer(false);
  }
  toggle_footer(show){
    console.log('toggling');
    if(show){
    document.querySelector(".detFooter")['style'].display = 'block';
    document.querySelector("page-details .scroll-content")['style'].marginBottom = 0;
    document.querySelector("page-details .fixed-content")['style'].marginBottom = 0;
    this.zone.run(()=>{
      this.showFooter = true;
    })

    }else{
      document.querySelector(".detFooter")['style'].display = 'none';
      document.querySelector("page-details .scroll-content")['style'].marginBottom = 0;
      document.querySelector("page-details .fixed-content")['style'].marginBottom = 0;
      this.zone.run(()=>{
      this.showFooter = false;
      })
    }
  }

  MyCtrl($scope, $ionicSlideBoxDelegate) {
    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
    }
  }

  goto(){
    this.content.scrollToBottom(300);//300ms animation speed
  }

  detect_position(){
      if(this.content.scrollTop > document.querySelector('body').offsetHeight  -100) {
        return true;
      }
      else return false;
  }
  scrollingFun(e){
      if(e.scrollTop > this.contentHandle.getContentDimensions().contentHeight - 200){
      this.toggle_footer(true);
    } else{
        this.toggle_footer(false);
    }
  }

  presentModal() {
    let modal = this.modalCtrl.create(MapModal);
    modal.present();
  }

  presentShare() {
    let Share = this.modalCtrl.create(ShareModal);
    Share.present();
  }

  ActiveLike(){
    this.like = !this.like;
  }

  itemSelected(){
    console.log("hidden");
    this.descriptionstatus = false;
  }
  stopPlayback(){
    console.log("show");
    this.descriptionstatus = true
  }

  rentalhide(){
    console.log("hidden");
    this.rentalstatus = false;
  }
  rentalshow(){
    console.log("show");
    this.rentalstatus = true
  }

  locationhide(){
    console.log("hidden");
    this.locationstatus = false;
  }
  locationshow(){
    console.log("show");
    this.locationstatus = true
    Geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, (err) => {
      console.log(err);
    });
  }

}