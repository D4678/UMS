import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'any', 
})
export class CountryService {
  private apiUrl = 'https://localhost:7231/api/Country';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl);
  }
}

export interface Country {
  id: number;
  name: string;
}
