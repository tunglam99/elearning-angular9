import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from '@app/_services/admin.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {XacNhanNopComponent} from '@app/quiz/xac-nhan-nop/xac-nhan-nop.component';

@Component({
  selector: 'app-quiz-user',
  templateUrl: './quiz-user.component.html',
  styleUrls: ['./quiz-user.component.less']
})
export class QuizUserComponent implements OnInit, OnDestroy {
  display: any;
  numberQuestion: any;
  constructor(private adminService: AdminService,
              private modalService: NgbModal,
              private router: Router,) {
    this.timer(10);
  }

  listQuestion = [];
  answer = [];

  ngOnInit(): void {
    const body = {};
    this.adminService.getQuesForUser(body).subscribe(data => {
      this.numberQuestion = data.questionCode.length;
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
  }
  ngOnDestroy(): void {
    clearInterval();
  }

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
    this.adminService.listAnswerSendBEForUser(body).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl(`/end-user/${data.score}/${this.numberQuestion}`);
    });
  }

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
