import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'any'
})

export class UserProfileService {
    private baseUrl = 'https://localhost:7231/api/UserProfile/';

    constructor(private http: HttpClient) {}

    getUserprofile(userId: string): Observable<any> {
        const requestUrl = `${this.baseUrl}${userId.trim()}`; // Trim userId for safety
        console.log("Requesting profile data from URL:", requestUrl);
        return this.http.get(requestUrl);
      }

      updateUserProfile(userId: string, profileData: any): Observable<any> {
        return this.http.put(`${this.baseUrl}${userId}`, profileData)
      }
    }