
import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../core/services/search.service';
import { WeatherService } from '../../core/services/weather.service';
import { WeatherResponse } from '../../core/models/weather.model';
import { AirQualityResponse } from './../../core/models/air.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  currentPlace: string = 'Quito';
  weatherData: WeatherResponse | null = null;
  airQualityData : AirQualityResponse | null = null;

  constructor(private toastr:ToastrService,
    private searchService: SearchService,
    private weatherService: WeatherService,
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
      next: (data) =>{
        this.weatherData = data,
        this.toastr.success("Información cargada correctamente.");
      },
      error: (error) => {
        this.toastr.error("Información no encontrada");
        console.error('Error fetching weather:', error)


        }
    });

  }
}
