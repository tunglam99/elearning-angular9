import { Component, OnInit } from '@angular/core';
import {AdminService} from '@app/_services/admin.service';

@Component({
  selector: 'app-xem-diem-cac-lan-thi',
  templateUrl: './xem-diem-cac-lan-thi.component.html',
  styleUrls: ['./xem-diem-cac-lan-thi.component.less']
})
export class XemDiemCacLanThiComponent implements OnInit {
  listView :any;
  loading: any;
  constructor(private admin: AdminService) { }

  ngOnInit(): void {
    this.loading = true
    this.admin.xemdiemcaclanthi().subscribe(data => {
      this.loading = false;
      this.listView = data
      console.log(data);
    });
  }

}
