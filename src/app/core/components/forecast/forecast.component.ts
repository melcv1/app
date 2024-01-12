import { CommonModule } from '@angular/common';
import { ForecastApiResponse } from './../../models/forecast.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent {
  @Input() forecasts!: ForecastApiResponse;
  @Input() displayFormat: string = 'shortDate';
  @Input() title?: string;

  @Output() daySelected = new EventEmitter<string>(); // Añadir EventEmitter

  onDaySelected(forecastDate: string) {
    this.daySelected.emit(forecastDate);
  }
}
