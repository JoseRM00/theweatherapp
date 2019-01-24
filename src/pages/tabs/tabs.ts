import { Component } from '@angular/core';

import { ForecastPage } from '../forecast/forecast';
import { WeatherPage } from '../weather/weather';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = WeatherPage;
  tab2Root = ForecastPage;
  
  constructor() {

  }
}
