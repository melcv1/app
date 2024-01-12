import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../../../../core/services/weather.service';
import { ForecastApiResponse } from '../../../../../core/models/forecast.model';
import { SearchService } from '../../../../../core/services/search.service';
import { ForecastComponent } from "../../../../../core/components/forecast/forecast.component";
import { ForecastService } from '../../../../../core/services/forecast.service';
import { DayComponent } from '../../../../day/day.component';
SearchService
@Component({
    selector: 'app-week',
    standalone: true,
    templateUrl: './week.component.html',
    styleUrl: './week.component.css',
    imports: [CommonModule, ForecastComponent, DayComponent]
})

export class WeekComponent implements OnInit {
  forecastData: ForecastApiResponse = [];
  currentPlace: string = '';

  constructor(
    private weatherService: WeatherService,
    private searchService: SearchService,
    private forecastService: ForecastService
  ) {}

  ngOnInit() {
    this.searchService.currentPlace.subscribe(place => {
      this.currentPlace = place;
      this.loadForecastData();
    });
  }

  loadForecastData() {
    this.weatherService.getNextForecast(this.currentPlace).subscribe({
      next: (data) => {
        this.forecastData = data;
        if (this.forecastData.length > 0) {
          const todayFormattedDate = this.formatDate(this.getCurrentDate());
          this.selectDay(todayFormattedDate);
        }
      },
      error: (error) => {
        console.error('Error fetching forecast data:', error);
      }
    });
  }

  selectDay(dateString: string) {
    console.log("Día seleccionado:", dateString);
    this.forecastService.changeSelectedDate(dateString);
  }

  private getCurrentDate(): string {
    const today = new Date();
    return today.toISOString();
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString();
  }

}
