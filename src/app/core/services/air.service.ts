import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError, of, throwError, OperatorFunction } from 'rxjs';
import { AirQualityResponse } from '../models/air.model';
import { environment } from '../../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class AirService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAirForPlace(place: string): Observable<AirQualityResponse> {

    const url = `${this.apiUrl}/air?city=${place}`;
    console.log(url)
    return this.http.get<AirQualityResponse>(url);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(`${operation} failed: ${error.message}`);

      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
