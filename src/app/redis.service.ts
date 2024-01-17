import { Injectable } from '@angular/core';
import { createClient } from 'redis';
import { Redis } from 'ioredis';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Event } from './listcluster/listcluster.component';

@Injectable({
  providedIn: 'root',
})
export class RedisService {
  
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getPoliceReports(): Observable<Event[]> {
    const url = `${this.baseUrl}/police`;
    return this.http.get<Event[]>(url).pipe(
      tap(_ => console.log('fetched police')),
      catchError(this.handleError<Event[]>('police error', []))
    );;
  }

  getFireReports(): Observable<Event[]> {
    const url = `${this.baseUrl}/fire`;
    return this.http.get<Event[]>(url).pipe(
      tap(_ => console.log('fetched fire')),
      catchError(this.handleError<Event[]>('fire error', []))
    );;
  }

  getWallOfShame(): Observable<Event[]> {
    const url = `${this.baseUrl}/shame`;
    return this.http.get<Event[]>(url).pipe(
      tap(_ => console.log('fetched shame')),
      catchError(this.handleError<Event[]>('blob error', []))
    );;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
