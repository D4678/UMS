import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'any'
})

export class SecurityQuestionService{
    private apiUrl = 'https://localhost:7231/api/UserSq';

    constructor(private http: HttpClient) {}

    getSecurityQuestion(): Observable<SecurityQuestion[]> {
        return this.http.get<SecurityQuestion[]>(this.apiUrl);
    }
}

export interface SecurityQuestion {
    id: number;
    name: string;
}