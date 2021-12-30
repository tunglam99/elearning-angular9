import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {User} from '@app/_models';
import {UserService} from '@app/_services';
import {AdminService} from '@app/_services/admin.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalAddQuestionComponent} from '@app/admin/modal-add-question/modal-add-question.component';
import {DeleteQuestionComponent} from '@app/admin/delete-question/delete-question.component';

@Component({templateUrl: 'admin.component.html'})
export class AdminComponent implements OnInit {
  loading = false;
  listQuestion: any;
  public mySelection: string[] = [];
  nameQ: any;

  constructor(private adminService: AdminService,
              private modalService: NgbModal,) {
  }

  ngOnInit() {
    this.loadData();
  }

  openModalAddQuestion() {
    const modalRef = this.modalService.open(ModalAddQuestionComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      backdropClass: 'light-blue-backdrop',
      keyboard: false
    });
    modalRef.componentInstance.title = 'Thêm mới câu hỏi';
    modalRef.result.then(result => {
      if (result === 'create') {
        this.loadData();
      }
    }).catch(error => error);
  }

  getLogType(logAppType: any) {
    if (logAppType === 'THDC') {
      return 'Tin học đại cương';
    } else {
      return 'Thiết kế website';
    }
  }

  private loadData() {
    this.loading = true;
    this.adminService.getAll().subscribe(data => {
      this.listQuestion = data;
      this.loading = false;
      console.log(this.listQuestion);
    });
  }

  onChange(row) {
    this.mySelection = row;

  }

  delete(dataItem) {
    const modalRef = this.modalService.open(DeleteQuestionComponent, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
      backdropClass: 'light-blue-backdrop',
      keyboard: false
    });
    modalRef.componentInstance.selectedItem = dataItem;
    modalRef.result.then(result => {
      if (result === 'ok') {
        this.loadData();
        this.mySelection = [];
      }
    }).catch(error => error);
  }

  edit(dataItem) {
    const modalRef = this.modalService.open(ModalAddQuestionComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      backdropClass: 'light-blue-backdrop',
      keyboard: false
    });
    modalRef.componentInstance.title = 'Cập nhật câu hỏi';
    modalRef.componentInstance.selectedItem = dataItem;
    modalRef.result.then(result => {
      if (result === 'update') {
        this.loadData();
      }
    }).catch(error => error);
  }

  search() {
    const body = {
      questionSearch: this.nameQ
    };
    this.loading = true;
    this.adminService.searchQuestion(body).subscribe(data => {
      this.listQuestion = data;
      this.loading = false;
    });
  }
}
