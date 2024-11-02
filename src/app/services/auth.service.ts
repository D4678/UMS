import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class AuthService {
  private loginUrl = 'https://localhost:7231/api/UserInfo/Login';
  private validateSecurityQuestionUrl = 'https://localhost:7231/api/UserInfo/ValidateSecurityQuestion';
  private resetPasswordUrl = 'https://localhost:7231/api/UserInfo/ResetPassword';

  constructor(private http: HttpClient) {}

  //login method
  login(userId: string, password:string):Observable<any> {
    return this.http.post<any>(this.loginUrl, {userId, password}).pipe(
      tap(response=> {
        if(response.token){
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userId', userId)
        }
      })
    );
  } 

  // logout Method
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  }

 // if the user is logged In
 isLoggedIn():boolean {
  const tokenExists = !!localStorage.getItem('authToken');
  console.log('Is logged in:', tokenExists); // Debug line
  return tokenExists;
 }

 

// Fetch the loginin user
 getUserId(): string | null {
  return localStorage.getItem('userId');
 }


  // Validate security question endpoint
  validateSecurityQuestion(userId: string, securityQuestionId: string, securityAnswer: string): Observable<any> {
    return this.http.post(this.validateSecurityQuestionUrl, {
      userId,
      securityQuestionId,
      securityAnswer
    });
  }

  // Reset password endpoint with token
  resetPassword(userId: string, newPassword: string, p0: { responseType: string; }): Observable<string> {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
  
    // Define headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Make sure to specify responseType: 'text' to handle plain text response
    return this.http.post<string>(this.resetPasswordUrl, { userId, newPassword }, { headers, responseType: 'text' as 'json' });
  }
}

