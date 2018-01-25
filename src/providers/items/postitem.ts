import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSetting } from '../api_route';

@Injectable()
export class Postitemprovider {

  apiUrl = this.appSettings.getApiURL();

  constructor(public http: Http, public appSettings: AppSetting) {
  	this.http=http;
    console.log('Hello PaymentProvider Provider');
  }

  public Itemsave(
      dailyprice,
      distance,
      deliver,
      categoryid,
      itemtitle,
      conditionmark,
      itemdetails, 
      imagurl,
      ownerid,
      favority
    ){
      console.log(categoryid + " categoryid");
      return this.http.post(this.apiUrl+'item/create', 
        {
          title: itemtitle,
          price: dailyprice,
          category: categoryid,
          imgUrl:imagurl,
          condition: conditionmark,
          favority:favority,
          owner: ownerid,
          distance:distance,
          description:itemdetails
        });
    }

  public rejectitem(rejectcondition, isremove){
    return this.http.post(this.apiUrl + 'item/reject', {rejectcondtion: rejectcondition, isremove: isremove});
  }

}
