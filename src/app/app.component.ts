import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from './_services';
import {User, Role} from './_models';
import {TranslateService} from '@ngx-translate/core';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit{
    user: User;
    role: string;

  constructor(private authenticationService: AuthenticationService,
              public translate: TranslateService) {
    this.authenticationService.user.subscribe(x => this.user = x);
    this.authenticationService.userRole.subscribe(x => {
      this.role = x;
      console.log(x);
    });


    translate.addLangs(['en-US', 'vi']);
    translate.setDefaultLang('vi');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/vi/) ? 'vi' : 'en-US');
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
  }

  ngOnInit(): void {
    console.log(this.user);
  }
}
