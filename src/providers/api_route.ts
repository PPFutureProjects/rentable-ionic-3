import { Injectable } from '@angular/core';

const CONFIG = {
	apiUrl: 'http://112.196.92.142/patrick-app/api.php'
};
@Injectable()
export class AppSetting {
	
	constructor() {
		// code...
	}

	public getApiURL(){
		return CONFIG.apiUrl;
	}
}