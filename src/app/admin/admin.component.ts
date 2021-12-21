import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';
import {AdminService} from '@app/_services/admin.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalAddQuestionComponent} from '@app/admin/modal-add-question/modal-add-question.component';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
    loading = false;
    listQuestion: any;
    constructor(private adminService: AdminService,
                private modalService: NgbModal,) { }

    ngOnInit() {
      this.adminService.getAll().subscribe(data => {
        this.listQuestion = data;
        console.log(this.listQuestion);
      });
    }

  openModalAddQuestion() {
    const modalRef = this.modalService.open(ModalAddQuestionComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
      backdropClass: 'light-blue-backdrop',
      keyboard: false
    });
  }

  getLogType(logAppType: any) {
    // if (logAppType === 'THDC') {
    //   return ''
    // }
  }
}
