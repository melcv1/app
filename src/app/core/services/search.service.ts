import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private placeSubject = new BehaviorSubject<string>('Quito');
  currentPlace = this.placeSubject.asObservable();

  changePlace(place: string) {
    this.placeSubject.next(place);
  }
}
