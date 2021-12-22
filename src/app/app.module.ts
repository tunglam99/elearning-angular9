import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgbModalModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';;
import { RegisterComponent } from './register/register.component'
;
import { QuizComponent } from './quiz/quiz.component'
;
import { ModalAddQuestionComponent } from './admin/modal-add-question/modal-add-question.component'
import {GridModule, SharedModule} from '@progress/kendo-angular-grid';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import {DeleteQuestionComponent} from '@app/admin/delete-question/delete-question.component';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
    imports: [
      NotifierModule.withConfig(
        customNotifierOptions
      ),
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        NgbModalModule,
        GridModule,
        SharedModule,
        NgbTooltipModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AdminComponent,
        LoginComponent
,
        RegisterComponent
,
        QuizComponent
, ModalAddQuestionComponent,
      DeleteQuestionComponent
            ],
  entryComponents: [
    ModalAddQuestionComponent, DeleteQuestionComponent
  ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
