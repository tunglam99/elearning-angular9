import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import {RegisterComponent} from '@app/register/register.component';
import {QuizComponent} from '@app/quiz/quiz.component';
import {TestComponent} from '@app/test/test.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'admin',
        component: AdminComponent,
        // canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
      path: 'test',
      component: TestComponent,
      // canActivate: [AuthGuard],
      data: { roles: [Role.Admin] }
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

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
