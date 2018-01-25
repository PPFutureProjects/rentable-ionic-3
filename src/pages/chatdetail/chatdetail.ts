import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar, Content } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';

import { OtherprofilePage } from '../otherprofile/otherprofile';
import { Details } from '../details/details';
import { ChatPage } from '../chat/chat';

/*
  Generated class for the ChatdetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chatdetail',
  templateUrl: 'chatdetail.html'
})
export class ChatdetailPage {

  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild(Content) content:Content;

	Chatdetail: any;
	otherprofile=OtherprofilePage;
	details=Details;
	chat=ChatPage;
  showEmojiPicker:any;
  tabBarElement:any;
  uid:any;
  interlocutor:string;
  message:string;
  chats:FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public af:AngularFireDatabase, public chatprovider: ChatProvider) {
  	this.Chatdetail ={
      img: 'assets/img/11.png', ownerimage:'assets/img/profile-img.png', item_title:'house', price:'25'};
    var uid = this.navParams.get('uid');
    // chatprovider.getChatRef(this.uid, this.interlocutor)
    // .then((chatRef:any)=>{
    //   this.chats = this.af.list(chatRef);
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatdetailPagePage');
    this.navBar.backButtonClick = () => {
      ///here you can do wathever you want to replace the backbutton event
      this.navCtrl.setRoot(ChatPage);
    };
  }

  ionViewDidEnter(){
    this.content.scrollToBottom();
  }

  sendMessage() {
    if(this.message) {
      let chat = {
          from: this.uid,
          message: this.message,
          type: 'message',
          time: Date()
      };
      this.chats.push(chat);
      this.message = "";
    }
  };

  switchEmojiPicker(){

  }

  onFocus(){
    
  }

}
