import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '@app/_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: any;
  name: any;
  password: any;
  checkCreate: boolean = false;
  constructor(private authenticationService: AuthenticationService,
               ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const  body = {
      email: this.email,
      name: this.name,
      password: this.password
    };
    this.authenticationService.createUser(body).subscribe(() => {
      this.checkCreate = true;
    });
  }
}
