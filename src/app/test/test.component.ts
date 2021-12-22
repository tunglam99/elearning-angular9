import {Component, OnInit} from '@angular/core';
import {AdminService} from '@app/_services/admin.service';
import {NotificationService} from '@app/_services/notification.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {
  public mySelection: string[] = [];
  questionType: any;
  dataGrid: any;
  testCode: any;
  numberQuestion: any;
  loading: boolean;

  constructor(private adminService: AdminService,
              private notiService: NotificationService,) {
  }

  ngOnInit(): void {

  }

  onChange(row) {
    this.mySelection = row;
  }

  getData() {
    this.dataGrid = null;
    const body = {
      question: 'string',
      questionType: this.questionType,
      answer: {
        answerA: 'string',
        answerB: 'string',
        answerC: 'string',
        answerD: 'string'
      },
      correctAnswer: 'A'
    };
    this.loading = true;
    this.adminService.getQByType(body).subscribe(value => {
      this.dataGrid = value;
      this.loading = false;
      console.log(this.dataGrid);
    });
  }

  handleChange(type: string) {
    if (type === 'THDC') {
      this.questionType = 'THDC';
    } else {
      this.questionType = 'TKWS';
    }

    this.getData();
  }

  getLogType(logAppType: any) {
    if (logAppType === 'THDC') {
      return 'Tin học đại cương';
    } else {
      return 'Thiết kế website';
    }
  }

  save() {
    const body = {
      testCode: this.testCode,
      numberQuestion: this.numberQuestion,
      questionCode: this.mySelection,
      type: this.questionType,
    };
    console.log(body);
    if (body.type === '' || body.type === null || body.type === undefined) {
      this.notiService.showNoti('Bạn phải chọn chủ đề của đề thi', 'error');
      return;
    }
    if (body.testCode === '' || body.testCode === null || body.testCode === undefined) {
      this.notiService.showNoti('Bạn phải nhập mã của đề thi', 'error');
      return;
    }
    if (body.numberQuestion === '' || body.numberQuestion === null || body.numberQuestion === undefined) {
      this.notiService.showNoti('Bạn phải nhập số câu hỏi của đề thi', 'error');
      return;
    }
    if (body.questionCode.length === 0) {
      this.notiService.showNoti('Không có câu hỏi nào được chọn', 'error');
      return;
    }
    this.loading = true;
    this.adminService.createTest(body).subscribe(() => {
      this.notiService.showSuccess();
      this.mySelection = [];
      this.testCode = null;
      this.numberQuestion = null;
      this.loading = false;
    }, error => {
      this.notiService.showNoti('Tạo mới thất bại', 'error');
      this.loading = false;
    });
  }
}
