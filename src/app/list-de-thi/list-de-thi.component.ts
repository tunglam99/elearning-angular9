import { Component, OnInit } from '@angular/core';
import {AdminService} from '@app/_services/admin.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteDeThiComponent} from '@app/list-de-thi/delete-de-thi/delete-de-thi.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-de-thi',
  templateUrl: './list-de-thi.component.html',
  styleUrls: ['./list-de-thi.component.less']
})
export class ListDeThiComponent implements OnInit {
  listDeThi: any;
  loading: any;
  public mySelection: string[] = [];
  constructor(private admin: AdminService,private modalService: NgbModal,
              private router: Router,
              ) { }

  ngOnInit(): void {
   this.loadData();
  }
  loadData() {
    this.admin.listDe().subscribe(data => {
      this.listDeThi = data;
    });
  }

  onChange(row) {
    this.mySelection = row;

  }

  delete(dataItem) {
    const modalRef = this.modalService.open(DeleteDeThiComponent, {
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

  update(dataItem: any) {
    console.log(dataItem);
    this.router.navigateByUrl(`/add-test/${dataItem.id}`);
  }
}
