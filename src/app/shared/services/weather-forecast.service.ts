import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherForcastService {
  weatherPermission = new BehaviorSubject<boolean>(false);
  weatherPermission$ = this.weatherPermission.asObservable();
  constructor() {}
}
