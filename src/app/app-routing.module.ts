import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home';
import {AdminComponent} from './admin';
import {LoginComponent} from './login';
import {AuthGuard} from './_helpers';
import {Role} from './_models';
import {RegisterComponent} from '@app/register/register.component';
import {QuizComponent} from '@app/quiz/quiz.component';
import {TestComponent} from '@app/test/test.component';
import {XemDiemComponent} from '@app/xem-diem/xem-diem.component';
import {QuizUserComponent} from '@app/quiz-user/quiz-user.component';
import {XemDiemUserComponent} from '@app/xem-diem-user/xem-diem-user.component';
import {KiThiDangDienRaComponent} from '@app/ki-thi-dang-dien-ra/ki-thi-dang-dien-ra.component';
import {XemDiemCacLanThiComponent} from '@app/xem-diem-cac-lan-thi/xem-diem-cac-lan-thi.component';
import {ListDeThiComponent} from '@app/list-de-thi/list-de-thi.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]}
  },
  {
    path: 'test',
    component: ListDeThiComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]}
  },
  {
    path: 'add-test',
    component: TestComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]}
  },
  {
    path: 'add-test/:dataItem',
    component: TestComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]}
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'quiz',
    component: QuizComponent
  },
  {
    path: 'end/:point/:numberQuestion',
    component: XemDiemComponent
  },
  {
    path: 'quiz-user',
    component: QuizUserComponent
  },
  {
    path: 'end-user/:point/:numberQuestion',
    component: XemDiemUserComponent
  },
  {
    path: 'ki-thi',
    component: KiThiDangDienRaComponent,
    // canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },
  {
    path: 'xem-diem-cac-lan-thi',
    component: XemDiemCacLanThiComponent,
    // canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
