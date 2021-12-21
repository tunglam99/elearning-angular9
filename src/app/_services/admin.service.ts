import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AdminService {
  API = environment.apiUrl;
  constructor(private http: HttpClient) { }

  createQuestion(body: any): Observable<any> {
    return this.http.post<any>(`${this.API}question`, body);
  }
  getAll(): Observable<any> {
    return this.http.get<any>(`${this.API}question`);
  }
}
