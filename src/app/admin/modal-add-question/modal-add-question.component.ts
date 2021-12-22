import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AdminService} from '@app/_services/admin.service';
import {NotifierService} from 'angular-notifier';
import {NotificationService} from '@app/_services/notification.service';


@Component({
  selector: 'app-modal-add-question',
  templateUrl: './modal-add-question.component.html',
  styleUrls: ['./modal-add-question.component.less']
})
export class ModalAddQuestionComponent implements OnInit {
  private readonly notifier: NotifierService;
  question: any;
  answerA: any;
  answerB: any;
  answerC: any;
  answerD: any;
  questionType: any;
  correctAnswer: any;
  @Input() selectedItem: any;

  constructor(private NgbActiveModal: NgbActiveModal,
              private adminService: AdminService,
              notifierService: NotifierService,
              private notiService: NotificationService,) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    console.log(this.selectedItem);
    if (this.selectedItem) {
      // this.adminService.getQById(this.selectedItem.)
      this.question = this.selectedItem.question;
      this.questionType = this.selectedItem.questionType;
      this.answerA = this.selectedItem.answer.answerA;
      this.answerB = this.selectedItem.answer.answerB;
      this.answerC = this.selectedItem.answer.answerC;
      this.answerD = this.selectedItem.answer.answerD;
      this.correctAnswer = this.selectedItem.correctAnswer;
    }
    console.log(this.correctAnswer);
    console.log(this.questionType);
  }

  close() {
    this.NgbActiveModal.close();
  }

  get activeModal() {
    return this.NgbActiveModal;
  }

  handleChange(type: string) {
    if (type === 'THDC') {
      this.questionType = 'THDC';
    } else {
      this.questionType = 'TKWS';
    }
  }

  save() {
    if (this.selectedItem) {
      const id = this.selectedItem.id;
      const put = {
        question: this.question,
        questionType: this.questionType,
        answer: {
          answerA: this.answerA,
          answerB: this.answerB,
          answerC: this.answerC,
          answerD: this.answerD,
        },
        correctAnswer: this.correctAnswer
      };
      this.adminService.update(id, put).subscribe(() => {
        this.notiService.showSuccess();
        this.activeModal.close('update');
      });
    } else {
      const body = {
        question: this.question,
        questionType: this.questionType,
        answer: {
          answerA: this.answerA,
          answerB: this.answerB,
          answerC: this.answerC,
          answerD: this.answerD,
        },
        correctAnswer: this.correctAnswer
      };
      console.log(body);
      if (body.question === '' || body.question === null || body.question === undefined){
        this.notifier.notify('eror', 'B chưa nhập nội dung');
        return;
      }
      if (body.questionType === undefined){
        this.notifier.notify('eror', 'B chọn kiểu nội dung');
      }
      if (body.answer.answerA === undefined || body.answer.answerA === ''){
        this.notifier.notify('eror', 'B chưa chọn A');
        return;
      }
      console.log(body);
      this.adminService.createQuestion(body).subscribe(() => {
        this.notifier.notify('success', 'Tạo mới câu hỏi thành công');
        this.notiService.showSuccess();
      });
    }

  }

  trueAnswer(answer: string) {
    if (answer === 'a') {
      this.correctAnswer = 'A';
    } else if (answer === 'b') {
      this.correctAnswer = 'B';
    } else if (answer === 'c') {
      this.correctAnswer = 'C';
    } else if (answer === 'd') {
      this.correctAnswer = 'D';
    }
  }

  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr fun!');
  // }
}