import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-xem-diem',
  templateUrl: './xem-diem.component.html',
  styleUrls: ['./xem-diem.component.less']
})
export class XemDiemComponent implements OnInit {
  point: any;
  constructor(private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(point =>{
      this.point = point.point;
      console.log(point);
    });
  }

}
