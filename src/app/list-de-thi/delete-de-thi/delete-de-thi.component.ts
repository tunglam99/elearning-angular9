import {Component, Input, OnInit} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {AdminService} from '@app/_services/admin.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '@app/_services/notification.service';

@Component({
  selector: 'app-delete-de-thi',
  templateUrl: './delete-de-thi.component.html',
  styleUrls: ['./delete-de-thi.component.less']
})
export class DeleteDeThiComponent implements OnInit {

  @Input() selectedItem: any;
  private readonly notifier: NotifierService;
  constructor(private adminService: AdminService,
              public _NgbActiveModal: NgbActiveModal,
              private notiService: NotificationService,
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
    this.adminService.deleteDeThi(this.selectedItem.id).subscribe(() => {
      this._NgbActiveModal.close('ok');
      this.notiService.showDelete();
    });
  }

}
