
import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../core/services/search.service';
import { WeatherService } from '../../core/services/weather.service';
import { WeatherResponse } from '../../core/models/weather.model';
import { AirService } from '../../core/services/air.service';
import { AirQualityResponse } from './../../core/models/air.model';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  currentPlace: string = 'Quito'; // Valor predeterminado
  weatherData: WeatherResponse | null = null;
  airQualityData : AirQualityResponse | null = null;

  constructor(
    private searchService: SearchService,
    private weatherService: WeatherService,
    private airservice: AirService,
  ) {}

  ngOnInit() {
    this.loadWeatherData();
  }

  onSearch() {
    this.searchService.changePlace(this.currentPlace);
    this.loadWeatherData();
  }

  private loadWeatherData() {
    this.weatherService.getWeatherForPlace(this.currentPlace).subscribe({
      next: (data) => this.weatherData = data,
      error: (error) => console.error('Error fetching weather:', error)
    });
    this.airservice.getAirForPlace(this.currentPlace).subscribe({
      next: (data) => this.airQualityData = data,
      error: (error) => console.error('Error fetching weather:', error)
    });
  }
}
