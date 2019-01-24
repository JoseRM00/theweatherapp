import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AppConstantsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppConstantsProvider {

  googleAPIURL: string;
  forecastURL: string;  

  constructor(public http: HttpClient) {
    //this.googleAPIURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";       
    this.googleAPIURL = "/geocode/json?address=";
    //this.forecastURL = "https://api.forecast.io/forecast/b23e7ea6ac1abb03e82a3674b357fbe4/";
    this.forecastURL = "/b23e7ea6ac1abb03e82a3674b357fbe4/";
  }

  getGoogleAPIURL() {
    return this.googleAPIURL;
  }

  getForecastURL() {
    return this.forecastURL;
  }

}
