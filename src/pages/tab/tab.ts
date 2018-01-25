import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ChatPage } from '../chat/chat';
import { Home } from '../home/home';
import { Myrent } from '../myrent/myrent';
import { AddPage } from '../add/add';
import { AlertsPage } from '../alerts/alerts';


/*
  Generated class for the TabPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html'
})
export class TabPage {

	tab1Root = Home;
  tab2Root = Myrent;
  tab3Root = AddPage;
  tab4Root = ChatPage;
  tab5Root = AlertsPage;
  myIndex:number;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.myIndex = navParams.data.tabIndex || 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabPagePage');
  }

}
