import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstantsProvider } from '../../providers/app-constants/app-constants';
import { WeatherApiProvider } from '../../providers/weather-api/weather-api';

/**
 * Generated class for the WeatherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
  providers: [AppConstantsProvider, WeatherApiProvider]
})
export class WeatherPage {

  weatherForm: FormGroup;
  private appConstants: any;
  private weather: any;
  private geometry: any;
  private currentWeather: any;
  weatherResult0: boolean;
  weatherResult1:boolean;
  summaryIcon: string;

  constructor(private navController: NavController, private fb: FormBuilder, appConstants: AppConstantsProvider, weatherApi: WeatherApiProvider) {
    this.weatherForm = fb.group({'location': ['', Validators.compose([Validators.required,Validators.pattern('[a-zA-Z, ]*'),
      Validators.minLength(3),Validators.maxLength(100)])]});
    this.appConstants = appConstants;
    this.weather = weatherApi;
    this.geometry = { "longitude":"", "latitude":""};
    this.currentWeather = {};
    this.weatherResult0 = false;
    this.weatherResult1 = false;
    this.summaryIcon ="";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeatherPage');
  }

  getWeather(formData: any) {
    this.weather.getGeometry(this.appConstants.getGoogleAPIURL(), formData.value.location).
    subscribe((data: any) => {
      try {             
        this.geometry.longitude = data.results[0].geometry.location.lng;
        this.geometry.latitude = data.results[0].geometry.location.lat;
        this.weather.getCurrentWeather(this.geometry.longitude,this.geometry.latitude).
        subscribe((weatherData: any) => {             
          this.currentWeather=weatherData.currently;
          this.weatherResult0= true;            
          if(this.currentWeather.summary.toLowerCase().indexOf("cloudy") > 0)
            this.summaryIcon = "cloudy";
          else if(this.currentWeather.summary.toLowerCase().indexOf("rainy") > 0)
            this.summaryIcon = "rainy";
          else if(this.currentWeather.summary.toLowerCase().indexOf("sunny") > 0)
            this.summaryIcon = "sunny";
          else if(this.currentWeather.summary.toLowerCase().indexOf("thunderstorm") > 0)
            this.summaryIcon = "thunderstorm";                 
        });        
      } catch {  this.weatherResult0 = false; this.weatherResult1 = true; };   
    });            
  }

}

