import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'any', 
})

export class StateService{
    private apiUrl = 'https://localhost:7231/api/State';

  constructor(private http: HttpClient) {}

  getStates(countryId: number): Observable<State[]> {
    return this.http.get<State[]>(`${this.apiUrl}?countryId=${countryId}`);
  }
}

export interface State {
  id: number;
  name: string;
  code: string;
  countryId: number;
  status: number;
}