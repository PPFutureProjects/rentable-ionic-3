import { Component } from '@angular/core';
import { NavController, NavParams, Platform , ViewController, ModalController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';

/*
  Generated class for the ShareModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-share-modal',
  templateUrl: 'share-modal.html'
})
export class ShareModal {

  public sendTo   : any;
  public subject  : string = 'Message from Social Sharing App';
  public message  : string = 'Take your app development skills to the next level with Mastering Ionic 2 - the definitive guide';
  public image    : string	= 'http://masteringionic2.com/perch/resources/mastering-ionic-2-cover-1-w320.png';
  public uri      : string	= 'http://masteringionic2.com/products/product-detail/s/mastering-ionic-2-e-book';

  constructor(public navCtrl: NavController, public navParams: NavParams,
                public platform : Platform, public modalCtrl: ModalController, public viewCtrl: ViewController) {}

    shareViaFacebook()
    {
      this.platform.ready()
      .then(() =>
      {
          SocialSharing.canShareVia('com.apple.social.facebook', this.message, this.image, this.uri)
          .then((data) =>
          {

            SocialSharing.shareViaFacebook(this.message, this.image, this.uri)
            .then((data) =>
            {
                console.log('Shared via Facebook');
            })
            .catch((err) =>
            {
                console.log('Was not shared via Facebook');
            });

          })
          .catch((err) =>
          {
            console.log('Not able to be shared via Facebook');
          });

      });
    }

    shareViaInstagram(){
      this.platform.ready()
      .then(() =>
      {

         SocialSharing.shareViaInstagram(this.message, this.image)
         .then((data) =>
         {
            console.log('Shared via shareViaInstagram');
         })
         .catch((err) =>
         {
            console.log('Was not shared via Instagram');
         });

      });
   }

  shareViaTwitter()
  {
      this.platform.ready()
      .then(() =>
      {
        SocialSharing.canShareVia('com.apple.social.twitter', this.message, this.image, this.uri)
        .then((data) =>
        {

          SocialSharing.shareViaFacebook(this.message, this.image, this.uri)
          .then((data) =>
          {
              console.log('Shared via Twitter');
          })
          .catch((err) =>
          {
              console.log('Was not shared via Twitter');
          });

        })
        .catch((err) =>
        {
          console.log('Not able to be shared via Twitter');
        });

      });
  }

   shareViaEmail()
   {
      this.platform.ready()
      .then(() =>
      {
         SocialSharing.canShareViaEmail()
         .then(() =>
         {
            SocialSharing.shareViaEmail(this.message, this.subject, this.sendTo)
            .then((data) =>
            {
               console.log('Shared via Email');
            })
            .catch((err) =>
            {
               console.log('Not able to be shared via Email');
            });
         })
         .catch((err) =>
         {
            console.log('Sharing via Email NOT enabled');
         });
      });
   }


   close() {
    this.viewCtrl.dismiss(); // This works fine
  }        

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareModalPage');
  }

}
