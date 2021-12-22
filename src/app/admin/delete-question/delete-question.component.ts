import {Component, Input, OnInit} from '@angular/core';
import {AdminService} from '@app/_services/admin.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-delete-question',
  templateUrl: './delete-question.component.html',
  styleUrls: ['./delete-question.component.less']
})
export class DeleteQuestionComponent implements OnInit {
  @Input() selectedItem: any;
  private readonly notifier: NotifierService;
  constructor(private adminService: AdminService,
              public _NgbActiveModal: NgbActiveModal,
              notifierService: NotifierService) { this.notifier = notifierService;}

  ngOnInit(): void {
  }
  get activeModal() {
    return this._NgbActiveModal;
  }

  public cancel() {
    this.activeModal.close('thanh cong');
  }
  onSubmit() {
    this.adminService.deleteQ(this.selectedItem.id).subscribe(() => {
      this._NgbActiveModal.close('ok');
      this.notifier.notify('success', 'Xóa thành công');
    })
  }
}
