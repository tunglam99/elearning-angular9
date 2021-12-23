import {Component, OnInit} from '@angular/core';
import {AdminService} from '@app/_services/admin.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {XacNhanNopComponent} from '@app/quiz/xac-nhan-nop/xac-nhan-nop.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  constructor(private adminService: AdminService,
              private modalService: NgbModal,) {
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
  }

  change($event, id) {
    const exist = this.answer.find((x) => x.id === id);
    if (!exist) {
      this.answer.push({
        id: id,
        answer: $event.key.slice(6),
      });
    } else {
      exist.answer = $event.key;
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
  }
}
