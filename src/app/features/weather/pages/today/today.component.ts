import { ForecastApiResponse } from './../../../../core/models/forecast.model';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SearchService } from '../../../../core/services/search.service';
import { WeatherService } from '../../../../core/services/weather.service';

import { LoaderService } from '../../../../core/services/loader.service';
import { AirService } from '../../../../core/services/air.service';
import { AirQualityResponse } from '../../../../core/models/air.model';
import { EMPTY, catchError, forkJoin, switchMap } from 'rxjs';
import { ForecastComponent } from "../../../../core/components/forecast/forecast.component";
AirService
@Component({
    selector: 'app-today',
    standalone: true,
    templateUrl: './today.component.html',
    styleUrl: './today.component.css',
    imports: [CommonModule, ForecastComponent]
})
export class TodayComponent implements OnInit {
  place: string = '';

  forecastData: ForecastApiResponse | null = null;
  airQualityData: AirQualityResponse | null = null;
  constructor(
    private searchService: SearchService,
    private weatherService: WeatherService,
    private airService: AirService) {}


    ngOnInit() {
      this.searchService.currentPlace.pipe(
        switchMap(place => {
          if (place) {
        this.place = place;


        return forkJoin({
          forecastData: this.weatherService.getForecastDate(place),
          airQuality: this.airService.getAirForPlace(place)
        });
        }
      return EMPTY;

        })
      ).subscribe({
    next: ({ forecastData, airQuality }) => {
      this.forecastData = forecastData;
      this.airQualityData = airQuality;

    },
    error: error => {
      console.error('Error fetching weather:', error);

    }
  });
}
}
