import {Component, OnInit} from '@angular/core';
import {AdminService} from '@app/_services/admin.service';
import {NotificationService} from '@app/_services/notification.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';

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
  time: any;
  idUpdate: any;
  listQuestion = [];
  constructor(private adminService: AdminService,
              private notiService: NotificationService,
              private translate: TranslateService,
              private route: ActivatedRoute,
              private router: Router,) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(dataItem => {
      this.idUpdate = dataItem.dataItem;
      if (this.idUpdate) {
        this.adminService.getdetaiDeThi(this.idUpdate).subscribe(data => {
          this.questionType = data.type;
          this.testCode = data.testCode;
          this.numberQuestion = data.numberQuestion;
          this.time = data.time;
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < data.questionCode.length; i++) {
            console.log(data.questionCode[i]);
            this.adminService.getQuestionById(data.questionCode[i]).subscribe(question => {
              this.listQuestion.push(question);
            });
          }
          this.dataGrid = this.listQuestion;
          console.log(this.listQuestion);
        });
      }
      console.log(dataItem);
      // this.numberQuestion = point.numberQuestion;
      // console.log(point);
    });
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
      time: this.time
    };
    console.log(body);
    if (body.type === '' || body.type === null || body.type === undefined) {
      this.notiService.showNoti(this.translate.instant('HOME.noti8'), 'error');
      return;
    }
    if (body.testCode === '' || body.testCode === null || body.testCode === undefined) {
      this.notiService.showNoti(this.translate.instant('HOME.noti9'), 'error');
      return;
    }
    if (body.numberQuestion === '' || body.numberQuestion === null || body.numberQuestion === undefined) {
      this.notiService.showNoti(this.translate.instant('HOME.noti10'), 'error');
      return;
    }
    if (body.questionCode.length === 0) {
      this.notiService.showNoti(this.translate.instant('HOME.noti11'), 'error');
      return;
    }
    if (this.idUpdate) {
      this.loading = true;
      this.adminService.updateDethi(this.idUpdate, body).subscribe(() => {
        this.notiService.showUpdate();
        this.mySelection = [];
        this.testCode = null;
        this.numberQuestion = null;
        this.time = null;
        this.loading = false;
        this.router.navigateByUrl(`/test`);
      }, error => {
        this.notiService.showNoti(this.translate.instant('HOME.noti12'), 'error');
        this.loading = false;
      });
    } else {
      this.loading = true;
      this.adminService.createTest(body).subscribe(() => {
        this.notiService.showSuccess();
        this.mySelection = [];
        this.testCode = null;
        this.numberQuestion = null;
        this.time = null;
        this.loading = false;
      }, error => {
        this.notiService.showNoti(this.translate.instant('HOME.noti12'), 'error');
        this.loading = false;
      });
    }
  }
}
