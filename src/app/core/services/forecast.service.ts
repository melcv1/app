
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ForecastApiResponse } from '../models/forecast.model';

@Injectable({ providedIn: 'root' })
export class ForecastService {
  private selectedDateSource = new BehaviorSubject<string | null>(null);
  selectedDate = this.selectedDateSource.asObservable();

  constructor() {}

  changeSelectedDate(date: string) {
    this.selectedDateSource.next(date);
    console.log(date);
  }

  // Agrega aquí otros métodos relacionados con el pronóstico si es necesario
}
