import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { enviroment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private url = enviroment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(endpoint: string): Observable<Object> {
    return this.http.get(`${this.url}/${endpoint}.json`);
  }

  getSingle(endpoint: string, id: string): Observable<Object> {
    return this.http.get(`${this.url}/${endpoint}/${id}.json`);
  }

  post<T>(endpoint: string, body: Object): Observable<T> {
    return this.http.post<T>(
      `${this.url}/${endpoint}.json`,
      body,
    );
  }

  put<T>(endpoint: string, id: string, body: T): Observable<T> {
    return this.http.put<T>(
      `${this.url}/${endpoint}/${id}.json`,
      body,
    )
  }

  deleteAll(endpoint: string): Observable<Object> {
    return this.http.delete(`${this.url}/${endpoint}.json`);
  }

  deleteSingle(endpoint: string, id: string) {
    return this.http.delete(`${this.url}/${endpoint}/${id}.json`);
  }
}
