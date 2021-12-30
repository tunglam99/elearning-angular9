import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // API = environment.apiDevUrl;
  API = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  createQuestion(body: any): Observable<any> {
    return this.http.post<any>(`${this.API}question`, body);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.API}question`);
  }

  getQById(id: string): Observable<any> {
    return this.http.get<any>(`${this.API}question/${id}`);
  }

  update(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.API}question/${id}/update`, body);
  }

  deleteQ(id: string): Observable<any> {
    return this.http.delete(`${this.API}question/${id}`);
  }

  getQByType(body: any): Observable<any> {
    return this.http.post<any>(`${this.API}question/type`, body);
  }

  createTest(body: any): Observable<any> {
    return this.http.post<any>(`${this.API}test`, body);
  }

  // khach
  getTestByTestCode(body: any): Observable<any> {
    return this.http.post<any>(`${this.API}test/test/guest`, body);
  }

  getQuestionById(id: any): Observable<any> {
    return this.http.get<any>(`${this.API}question/no-answer/${id}`);
  }

  listAnswerSendBE(body: any): Observable<any> {
    return this.http.post<any>(`${this.API}test/answer/guest`, body);
  }

  // thi cho user

  getQuesForUser() {
    return this.http.get<any>(`${this.API}test/test/user`);
  }

  listAnswerSendBEForUser(body: any): Observable<any> {
    return this.http.post<any>(`${this.API}test/answer/user`, body);
  }

  xemdiemcaclanthi(): Observable<any> {
    return this.http.get<any>(`${this.API}test/answer/user`);
  }

  listDe(): Observable<any> {
    return this.http.get<any>(`${this.API}test`);
  }

  deleteDeThi(id: string): Observable<any> {
    return this.http.delete(`${this.API}test/${id}`);
  }

  getdetaiDeThi(id: any) : Observable<any> {
    return this.http.get<any>(`${this.API}test/${id}`);
  }

  updateDethi(id: any, body: any) : Observable<any> {
    return this.http.put<any>(`${this.API}test/${id}/update`, body);
  }

  searchQuestion(name: { questionSearch: any }): Observable<any> {
    return this.http.post<any>(`${this.API}question/search`, name);
  }
}
