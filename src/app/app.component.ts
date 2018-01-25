import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar  } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { Keyboard } from 'ionic-native';
//import {FCM, NotificationData} from "@ionic-native/fcm";

//import { TabsPage } from '../pages/tabs/tabs';
import { LandingPage } from '../pages/landing/landing';
import { Login } from '../pages/login/login';
import {ForgetpassswordPage} from '../pages/forgetpasssword/forgetpasssword';
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  //rootPage:any = TabsPage;
  rootPage: any = LandingPage;
  token:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private afAuth: AngularFireAuth) {

    afAuth.authState.subscribe(user => {
      if (!user) {
        // you can modify here the page for non. auth users
        this.rootPage = LandingPage
        return;
      }
      // page for auth. users
      this.rootPage = LandingPage
    });

    window.addEventListener('native.keyboardshow', keyboardShowHandler);

    function keyboardShowHandler(e){
      this.keyboard.show();
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      Keyboard.hideKeyboardAccessoryBar(false);

      // this.fcm.getToken()
      // .then((token:string)=>{
      //  console.log("The token to use is: ",token);
      //  this.token=token;
      // })
      // .catch(error=>{
      //   console.error(error);
      // });

      // this.fcm.onTokenRefresh().subscribe(
      //   (token:string)=>console.log("Nuevo token",token),
      //   error=>console.error(error)
      // );

      // this.fcm.onNotification().subscribe(
      //   (data:NotificationData)=>{
      //     if(data.wasTapped){
      //       alert(JSON.stringify(data));
      //     }else{

      //       alert(JSON.stringify(data))
      //     }
      //    },error=>{
      //     console.error("Error in notification",error)
      //    }
      // );

    });
  }
}
