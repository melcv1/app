import { SearchService } from './../../core/services/search.service';
import { ForecastService } from './../../core/services/forecast.service';
import { WeatherService } from './../../core/services/weather.service';
import { Component, OnInit,  } from '@angular/core';
import { ForecastApiResponse } from '../../core/models/forecast.model';
import { CommonModule } from '@angular/common';
import {switchMap,  EMPTY } from 'rxjs';

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})
export class DayComponent implements OnInit {

  selectedDate: string = '';
  city: string = '';
  dayDetails: ForecastApiResponse | null = null;
  currentPageData: ForecastApiResponse = [];  pages: number[] = [];
  currentPage: number = 0;

  constructor(

    private weatherService: WeatherService,
     private forecastService:ForecastService
     ,private searchService: SearchService) {

   }



   ngOnInit() {
    this.searchService.currentPlace.pipe(
      switchMap(place => {
        if (place) {
          this.city = place;
          return this.forecastService.selectedDate;
        }
        return EMPTY;
      }),
      switchMap(selectedDate => {
        if (selectedDate) {
          const formattedDate = this.formatDateToYYYYMMDD(selectedDate);
          return this.weatherService.getForecastDateDay(this.city, formattedDate);
        }
        return EMPTY;
      })
    ).subscribe({
      next: data => {
        this.dayDetails = data;
        this.initPagination();

      },
      error: error => {
        console.error('Error fetching details for selected day:', error);

      }
    });
  }
  private loadDayDetails(selectedDate: string, city: string) {
    this.dayDetails = null;
    this.currentPageData = [];

    this.weatherService.getForecastDateDay(city, selectedDate).subscribe({
      next: (data) => {
        this.dayDetails = data;
        this.initPagination();
      },
      error: (error) => {
        console.error('Error fetching details for selected day:', error);
      }
    });
  }

  private initPagination() {
    const itemsPerPage = 10;
    if (this.dayDetails) {
      this.pages = Array.from({ length: Math.ceil(this.dayDetails.length / itemsPerPage) }, (_, i) => i);
      this.goToPage(0);
    }
  }

  goToPage(page: number) {
    const itemsPerPage = 10;
    this.currentPage = page;
    if (this.dayDetails) {
      const startIndex = itemsPerPage * page;
      this.currentPageData = this.dayDetails.slice(startIndex, startIndex + itemsPerPage);
    }
  }
  private formatDateToYYYYMMDD(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }
}
