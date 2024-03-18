import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map, Observable, Subject } from 'rxjs';

import { Vehicle } from './vehicle.model';
import { tap } from 'rxjs/operators';
import { enviroment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http: HttpClient) {}

  private apiUrl = enviroment.apiUrl;
  private vehiclesUrlEndpointUrl = enviroment.vehiclesUrl;

  private all = new Subject<void>();
  all$ = this.all.asObservable();

  test$ = this.http.get<Vehicle[]>(`${this.apiUrl}${this.vehiclesUrlEndpointUrl}`);

  getAllTrigger(): void {
    this.all.next();
  }

  getAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}${this.vehiclesUrlEndpointUrl}`)
    .pipe(
        tap((res) => {
          console.log(res);
        }),
    );
  }
}
