import { WeatherResponse } from './../../../../core/models/weather.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../../core/services/search.service';
import { WeatherService } from '../../../../core/services/weather.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../../core/services/loader.service';

@Component({
  selector: 'app-today',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './today.component.html',
  styleUrl: './today.component.css'
})
export class TodayComponent implements OnInit {
  place: string = ''; // Agregamos la propiedad place aquí
  isLoading: boolean = false;
  weatherData: WeatherResponse | null = null;  // Initialize to null for better checking.

  constructor(private toastr:ToastrService, private searchService: SearchService, private weatherService: WeatherService) {}

  ngOnInit() {
    this.searchService.currentPlace.subscribe(place => {
      if (place) {
        this.place= place;
        this.isLoading = true; // Muestra el loader
        this.weatherService.getWeatherForPlace(place).subscribe({
          next: (data) => {
            this.weatherData = data;
            this.isLoading = false; // Oculta el loader
            // Aquí puedes mostrar la notificación de éxito
            this.toastr.success("Información cargada correctamente.");
          },
          error: (error) => {
            console.error('Error fetching weather:', error);
            this.toastr.error("Información no encontrada");
            this.isLoading = false; // Oculta el loader en caso de error
          }
        });
      }
    });
  }
}
