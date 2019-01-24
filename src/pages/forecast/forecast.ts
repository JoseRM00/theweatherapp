import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstantsProvider } from '../../providers/app-constants/app-constants';
import { WeatherApiProvider } from '../../providers/weather-api/weather-api';
import * as $ from "jquery";
import * as HighCharts from 'highcharts';

/**
 * Generated class for the ForecastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forecast',
  templateUrl: 'forecast.html',
  providers: [AppConstantsProvider, WeatherApiProvider]
})
export class ForecastPage {

  forecastForm: FormGroup;
  private appConstants: any;
  private weather: any;
  private geometry: any;
  private minWeather: number[][];
  private maxWeather: number[][];
  private weatherTime: any;
  weatherResult: boolean;
  summaryIcon: string;
  chartValue: {};

  constructor(private navController: NavController, private fb: FormBuilder, appConstants: AppConstantsProvider, weatherApi: WeatherApiProvider) {
    this.forecastForm = fb.group({'location': ['', Validators.compose([Validators.required,Validators.pattern('[a-zA-Z, ]*'),
      Validators.minLength(3),Validators.maxLength(100)])],'forecastType': 'daily'});
    this.appConstants = appConstants;
    this.weather = weatherApi;
    this.geometry = { "longitude":"", "latitude":""};
    this.minWeather = new Array();
    this.maxWeather = new Array();
    this.weatherTime = new Array();
    this.weatherResult = false;
    this.summaryIcon ="";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForecastPage');
  }

  filterJson(json,forecastType) {
    this.minWeather = new Array();
    this.maxWeather = new Array();
    this.weatherTime = new Array();
    for(var i=0;i<json.length;i++)
    {
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var b: Date = new Date(json[i].time * 1000);
      if(forecastType == "daily")
      {
        this.weatherTime.push(b.getDate()+" "+months[b.getMonth()]+" "+b.getFullYear());
        this.maxWeather.push(json[i].temperatureMax);
        this.minWeather.push(json[i].temperatureMin);
      }
      else
      {
        this.weatherTime.push(b.getDate()+" "+months[b.getMonth()]+" "+b.getFullYear() +" - "+b.getHours() +" hours");
        this.minWeather.push(json[i].temperature);
      }
    }
  }

  getForecast(formData: any) {
    this.weather.getGeometry(this.appConstants.getGoogleAPIURL(), formData.value.location).
    subscribe((data: any) => {
      try {      
        this.geometry.longitude = data.results[0].geometry.location.lng;
        this.geometry.latitude = data.results[0].geometry.location.lat;
        this.weather.getCurrentWeather(this.geometry.longitude,this.geometry.latitude).
        subscribe((weatherData: any) => {
          this.weatherResult = true;
          if(formData.value.forecastType == "daily")
          {
            this.filterJson(weatherData.daily.data,formData.value.forecastType);
            $(function () {            
            this.chartValue = HighCharts.chart('container', {
              title : { text : 'Weather Forecast' },
              chart: { type: 'column' },
              xAxis: { categories: this.weatherTime },
              series: [{name: 'Min Temp', data: (function() {
                var data = [];
                for (let i = 0; i <= 7; i += 1) {
                  data.push({
                    x: i,
                    y: weatherData.daily.data[i].temperatureMin
                  });              
                }
                return data;
              }()) },
              {name: 'Max Temp', data: (function() {
                var data = [];
                for (let i = 0; i <= 7; i += 1) {
                  data.push({
                    x: i,
                    y: weatherData.daily.data[i].temperatureMax
                  });
                }
                return data;
              }()) }
            ]
            });  
          
          });       
          }
          else
          {
            this.filterJson(weatherData.hourly.data,formData.value.forecastType);
            $(function () {           
            this.chartValue = HighCharts.chart('container', {
              title : { text : 'Weather Forecast' },
              chart: { type: 'column' },
              xAxis: { categories: this.weatherTime },
              series: [{name: 'Temp', data: (function() {
                var data = [];
                for (let i = 0; i <= 24; i += 1) {
                  data.push({
                    x: i,
                    y: weatherData.hourly.data[i].temperature
                  });
                }
                return data;
              }()) }
            ]
            }); 
          
          });       
          }    
        
        });  

      } catch {  this.weatherResult = false; };
     
    });

  }

}
