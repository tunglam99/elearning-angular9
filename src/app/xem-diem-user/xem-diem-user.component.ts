import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-xem-diem-user',
  templateUrl: './xem-diem-user.component.html',
  styleUrls: ['./xem-diem-user.component.less']
})
export class XemDiemUserComponent implements OnInit {

  point: any;
  numberQuestion: any
  constructor(private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(point =>{
      this.point = point.point;
      this.numberQuestion = point.numberQuestion;
      console.log(point);
    });
  }

}
