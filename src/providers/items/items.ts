import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSetting } from '../api_route';

/*
  Generated class for the ItemsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ItemsProvider {

	apiUrl=this.appsetting.getApiURL();

  constructor(public http: Http,public appsetting: AppSetting) {
  	this.http=http;
    console.log('Hello ItemsProvider Provider');
  }

  public Getitems(){
    return this.http.get(this.apiUrl+'item/index');
  }

  public addfavourity(itemnumber){
    return this.http.post(this.apiUrl+'item/addfavourity', {item: itemnumber});
  }

  public Alertsave(alerttitle, category, location, date, fromprice, toprice, distance, within, sortby){
    return this.http.post(this.apiUrl+'item/alertsave', {alerttitle: alerttitle, category:category, location: location,date:date, fromprice:fromprice, toprice:toprice, distance:distance,within:within, sortby:sortby});
    
  }

  public Searchsave(category, location, date, fromprice, toprice, distance, within, sortby){
    return this.http.post(this.apiUrl+'item/searchsave', {category:category, location: location,date:date, fromprice:fromprice, toprice:toprice, distance:distance,within:within, sortby:sortby});
  }

  public Setfavourity(uuid){
    return this.http.post(this.apiUrl + 'item/setfavouirty',  {uid: uuid});
  }

  public Getfavourity(uuid){
    return this.http.post(this.apiUrl + 'item/showfavouirty',  {uid: uuid});
  }

  public Getownavailable(uuid){
    return this.http.post(this.apiUrl + 'item/ownavailable',  {uid: uuid});
  }

  public Getownrent(uuid){
    return this.http.post(this.apiUrl + 'item/ownrent',  {uid: uuid});
  }

  public Getrenthistory(uuid){
    return this.http.post(this.apiUrl + 'item/renthistory',  {uid: uuid});
  }

  public Getrentcurrent(uuid){
    return this.http.post(this.apiUrl + 'item/rentcurrent',  {uid: uuid});
  }

  public Getchatitems(uuid){
    return this.http.post(this.apiUrl + 'item/chatitem',  {uid: uuid});
  }

  public Getalerthistory(uuid){
    return this.http.post(this.apiUrl + 'item/alerthistory', {uid: uuid});
  }

  public Getoppotunityhistory(uuid){
    return this.http.post(this.apiUrl + 'item/opptunityhistory', {uid: uuid});
  }

  public Getcurrentopputunity(uuid){
    return this.http.post(this.apiUrl + 'item/currenopptunity', {uid: uuid});
  }

  public Getitemdetail(itemuid){
    return this.http.post(this.apiUrl + 'item/read', {itemId: itemuid});
  }

  public SendRental(uuid, date, price, itemuid){
    return this.http.post(this.apiUrl + 'item/sendrental', {uid: uuid, itemnumber: itemuid, date:date, price:price});
  }


}
