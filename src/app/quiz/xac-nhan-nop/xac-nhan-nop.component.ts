import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-xac-nhan-nop',
  templateUrl: './xac-nhan-nop.component.html',
  styleUrls: ['./xac-nhan-nop.component.less']
})
export class XacNhanNopComponent implements OnInit {

  constructor(public _NgbActiveModal: NgbActiveModal,) {
  }

  ngOnInit(): void {
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  public cancel() {
    this.activeModal.close('thanh cong');
  }

  onSubmit() {
    this.activeModal.close('ok');
  }
}
