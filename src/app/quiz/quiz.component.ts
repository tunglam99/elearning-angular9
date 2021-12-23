import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from '@app/_services/admin.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {XacNhanNopComponent} from '@app/quiz/xac-nhan-nop/xac-nhan-nop.component';
import {Router} from '@angular/router';
import {Observable, Subscription, timer} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  // countDown: Subscription;
  // counter: number;
  // tick = 1000;
  intervalId = 0;
  message = '';
  seconds = 10;


  display: any;
  constructor(private adminService: AdminService,
              private modalService: NgbModal,
              private router: Router,) {
    this.timer(1);
  }

  listQuestion = [];
  answer = [];

  ngOnInit(): void {
    const body = {
      testCode: 'TKWS-2',
      numberQuestion: 0,
      questionCode: [],
      type: 'THDC'
    };
    this.adminService.getTestByTestCode(body).subscribe(data => {
      console.log(data);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data.questionCode.length; i++) {
        console.log(data.questionCode[i]);
        this.adminService.getQuestionById(data.questionCode[i]).subscribe(question => {
          this.listQuestion.push(question);
        });
      }
      console.log(this.listQuestion);
    });
    // this.countDown();
  }

  ngOnDestroy(): void {
    // this.clearTimer();
  }
  // clearTimer() { clearInterval(this.intervalId); }

  change($event, id) {
    const exist = this.answer.find((x) => x.id === id);
    if (!exist) {
      this.answer.push({
        id: id,
        answer: $event.key.slice(6),
      });
    } else {
      exist.answer = $event.key.slice(6);
    }
    console.log(this.answer);
  }

  submit() {
    const body = {
      testCode: 'string',
      numberQuestion: 2,
      answer: this.answer
    };
    this.adminService.listAnswerSendBE(body).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl(`/end/${data}`);
    });
  }

  // startTimer() {
  //   this.countDown = timer(0, this.tick).subscribe(() => {
  //     if (this.counter > 0) {
  //       --this.counter;
  //     } else {
  //       this.counter = 0;
  //       this.submit();
  //     }
  //   });
  // }

  openModalXacNhan() {
    const modalRef = this.modalService.open(XacNhanNopComponent, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
      backdropClass: 'light-blue-backdrop',
      keyboard: false
    });
    modalRef.result.then(result => {
      if (result === 'ok') {
        this.submit();
      }
    });
  }

  // private countDown() {
  //   // this.clearTimer();
  //   this.intervalId = window.setInterval(() => {
  //     this.seconds -= 1;
  //     if (this.seconds === 0) {
  //       this.submit();
  //     } else {
  //       if (this.seconds < 0) { this.seconds = 10; } // reset
  //       this.message = `T-${this.seconds} seconds and counting`;
  //     }
  //   }, 1000);
  // }

  timer(minute) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        this.submit();
        clearInterval(timer);
      }
    }, 1000);
  }
}
