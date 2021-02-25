import { Component, OnInit } from '@angular/core';
import { BusService } from '../bus.service';

@Component({
  selector: 'app-operator-home',
  templateUrl: './operator-home.component.html',
  styleUrls: ['./operator-home.component.css']
})
export class OperatorHomeComponent implements OnInit {

  busDetails
  todayDate
  constructor(private bus:BusService) { }

  ngOnInit(): void {
    this.todayDate=new Date().toDateString()
    this.bus.operatorBus(localStorage.getItem('operatorId')).subscribe((buses)=>{
      console.log(buses)
      this.busDetails=buses.bus
    })
  }
 
}
