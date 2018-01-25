import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { Observable } from 'rxjs/Observable';
import { ChatdetailPage } from '../chatdetail/chatdetail';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { ChatProvider } from '../../providers/chat/chat';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the ChatPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  onelist: Array<any>;
  rentlist: Array<any>;
	chatdetails=ChatdetailPage;
  own_rent:string="own";
  itemdelete:any;
  chatlist:Array<any>;
  uid:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public itemprovider: ItemsProvider,
              public authprovider: AuthenticateProvider,
              public chatprovider: ChatProvider,
              public af:AngularFireDatabase) {
  	this.onelist =
  	[
  		{img: 'assets/img/11.png', title: 'John', item_title:'house', history:'2 days ago'},
  	 	{img: 'assets/img/22.png', title: 'sizza', item_title:'apple', history:'3 days ago'},
  	 	{img: 'assets/img/33.png', title: 'jonathan', item_title:'nut', history:'3 days ago'},
  	 	{img: 'assets/img/11.png', title: 'Josh', item_title:'pear', history:'5 days ago'},
  	 	{img: 'assets/img/11.png', title: 'Joseph', item_title:'TV', history:'9 days ago'}
  	]

    this.chatlist=[];
    this.uid=localStorage.getItem('uid');
    this.chatprovider.getChats()
    .subscribe(chats => {
      this.chatlist = chats.map(users => {
        return users.map(user => {
          user.info = this.af.object(`/users/${user.$key}`);
          console.log(" user infor ",user );
          return user;
        });
      });
    });

    this.rentlist =
    [
      {img: 'assets/img/22.png', title: 'John', item_title:'house', history:'2 days ago'},
      {img: 'assets/img/33.png', title: 'Jane', item_title:'apple', history:'4 days ago'},
      {img: 'assets/img/11.png', title: 'Eric', item_title:'nut', history:'6 days ago'},
      {img: 'assets/img/22.png', title: 'Joseph', item_title:'pear', history:'7 days ago'},
      {img: 'assets/img/33.png', title: 'Joans', item_title:'TV', history:'8 days ago'}
    ]
    this.itemprovider.Getchatitems(localStorage.getItem('uid')).subscribe(data =>{
      console.log();
    },err=>{
      console.log();
    })

    this.itemdelete=false;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPagePage');
  }

  delete(){
    this.itemdelete=!this.itemdelete;
  }

  deleteown(n){
    console.log('n ++', n);
    for (var i = 0; i <this.onelist.length; i++) {
      if(this.onelist[i]==n){
        this.onelist.splice(i, 1);
      }
    }
  }

  deleterent(n){
    console.log('n ++', n);
    for (var i = 0; i <this.rentlist.length; i++) {
      if(this.rentlist[i]==n){
        this.rentlist.splice(i, 1);
      }
    }
  }

  chatdetail(key){
    let param = {uid: this.uid, interlocutor: key}; 
    if (this.itemdelete==false) {
      this.navCtrl.push(ChatdetailPage, param);
    }
  }

}
