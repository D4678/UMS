import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'any', 
})

export class CityService{
    private apiUrl = 'https://localhost:7231/api/City';

  constructor(private http: HttpClient) {}

  getCities(stateId: number): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}?stateId=${stateId}`);
  }
}

export interface City {
  id: number;
  name: string;
  code: string;
  stateId: number;
  status: number;
}