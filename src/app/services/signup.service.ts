import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class SignupService {

  private apiUrl = 'https://localhost:7231/api/UserInfo/AddUser';

  constructor(private http: HttpClient) {}

  createUser(signupData: any): Observable<any> {
    return this.http.post(this.apiUrl, signupData);
  }
}
