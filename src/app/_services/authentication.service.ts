import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '@app/_models';
import {environment} from '@environments/environment';



@Injectable({providedIn: 'root'})
export class AuthenticationService {
  // API = environment.apiDevUrl;
  API = environment.apiUrl;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public userRoleSubject = new  BehaviorSubject<string>('');
  public userRole = this.userRoleSubject.asObservable();
  role: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(user.token);
      this.role = decodedToken.role;
      this.userRole = new BehaviorSubject<string>(this.role);
    }
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.userRoleSubject = new BehaviorSubject<string>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public get userRoleValue(): string {
    return this.userRoleSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(this.API + 'auth/login', {email, password})
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(user.token);
        this.role = decodedToken.role;
        console.log(this.role);
        this.userSubject.next(user);
        this.userRoleSubject.next(this.role);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  checkRole() {
    this.role = this.http.get<any>(this.API + 'auth/check-role');
    console.log(this.role);
    // this.userSubject.next(this.role);
  }

  createUser(body: any): Observable<any> {
    return this.http.post<any>(this.API + 'auth/register', body);
  }

}
