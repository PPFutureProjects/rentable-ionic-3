import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ChatProvider {

  constructor(public http: Http, public af:AngularFireDatabase) {
    console.log('Hello ChatProvider Provider');
  }

  getChats() {
  	var uid = localStorage.getItem(uid);
    let chats = this.af.list(`/users/${uid}/chats`);
    return chats;
     
  }
  
  // Add Chat References to Both users
  addChats(uid,interlocutor) {
    // First User
    let endpoint = this.af.object(`/users/${uid}/chats/${interlocutor}`);
    endpoint.set(true);
    
    // Second User
    let endpoint2 = this.af.object(`/users/${interlocutor}/chats/${uid}`);
    endpoint2.set(true);
  }

  getChatRef(uid, interlocutor) {
    console.log(interlocutor + " interlocutor");
    let firstRef = this.af.object(`/chats/${uid},${interlocutor}`, {preserveSnapshot:true});
    let promise = new Promise((resolve, reject) => {
      firstRef.subscribe(snapshot => {
        let a = snapshot.exists();
        if(a) {
            resolve(`/chats/${uid},${interlocutor}`);
        } else {
          let secondRef = this.af.object(`/chats/${interlocutor},${uid}`, {preserveSnapshot:true});
          secondRef.subscribe(snapshot => {
            let b = snapshot.exists();
            if(!b) {
                this.addChats(uid,interlocutor);
            }
          });
          resolve(`/chats/${interlocutor},${uid}`);
        }
        });
    });
    
    return promise;
  }

}
