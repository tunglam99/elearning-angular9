import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '@app/_services';
import {NotificationService} from '@app/_services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: any;
  name: any;
  password: any;

  constructor(private authenticationService: AuthenticationService,
              private noti: NotificationService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const  body = {
      email: this.email,
      name: this.name,
      password: this.password
    };
    this.authenticationService.createUser(body).subscribe(() => {
      this.noti.showNoti('Tạo tài khoản thành công', 'success')
    });
  }
}
