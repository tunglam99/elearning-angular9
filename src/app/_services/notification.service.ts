import {Injectable} from '@angular/core';

import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService,
              private translate: TranslateService) {
  }

  showNoti(msg: string, type: 'success' | 'warning' | 'error' | 'info') {
    switch (type) {
      case 'error':
        this.toastr.error(msg);
        break;
      case 'info':
        this.toastr.info(msg);
        break;
      case 'success':
        this.toastr.success(msg);
        break;
      case 'warning':
        this.toastr.warning(msg);
        break;
    }
  }

  showSuccess() {
    this.toastr.success(this.translate.instant('HOME.add'));
  }
  showUpdate() {
    this.toastr.success(this.translate.instant('HOME.update'));
  }
  showDelete() {
    this.toastr.success(this.translate.instant('HOME.delete'));
  }

  showError(message, title) {
    this.toastr.error();
  }

  showInfo(message, title) {
    this.toastr.info();
  }

  showWarning(message, title) {
    this.toastr.warning();
  }

}
