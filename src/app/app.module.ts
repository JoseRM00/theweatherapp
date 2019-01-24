import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { WeatherApiPage } from '../pages/weather-api/weather-api';
//import { ForecastPage } from '../pages/forecast/forecast';
//import { WeatherPage } from '../pages/weather/weather';
import { AppConstantsProvider } from '../providers/app-constants/app-constants';
import { WeatherApiProvider } from '../providers/weather-api/weather-api';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

@NgModule({
  declarations: [
    MyApp,
    WeatherApiPage,     

  ],
  imports: [
    BrowserModule,       
    HttpClientModule,
    ChartModule,    
    IonicModule.forRoot(MyApp)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,  
    WeatherApiPage,        
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppConstantsProvider,
    WeatherApiProvider,
    HighchartsStatic
  ]
})
export class AppModule {}
