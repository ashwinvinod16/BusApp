import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { BusService } from '../bus.service';

@Component({
  selector: 'app-addbus',
  templateUrl: './addbus.component.html',
  styleUrls: ['./addbus.component.css']
})
export class AddbusComponent implements OnInit {

  busForm:FormGroup
  successmsg:String
  currentDate
  constructor(private bus:BusService) { 

  }

  ngOnInit(): void {
    this.busForm = new FormGroup({
      "busName":new FormControl('',Validators.required),
      "startingPoint":new FormControl('',Validators.required),
      "endPoint":new FormControl('',Validators.required),
      "Departuretime":new FormControl('',Validators.required),
      "typeOfBus":new FormControl('',Validators.required),
      "farePerPerson":new FormControl('',Validators.required),
      "regularPassenger":new FormControl('')
    })
  
  }

  createBus(){

    if(this.busForm.valid){
      this.currentDate=new Date().toDateString();
      this.busForm.value.startingPoint= this.busForm.value.startingPoint.toUpperCase()
      this.busForm.value.endPoint= this.busForm.value.endPoint.toUpperCase()
      this.busForm.value.numberOFSeats=36
      this.busForm.value.regularPassenger = this.busForm.value.regularPassenger.split(",")
      this.busForm.value.operatorId=localStorage.getItem('operatorId')
      this.busForm.value.Availability={
        date:this.currentDate,
        seats:this.busForm.value.numberOFSeats
      }
      console.log(this.busForm.value)
      this.bus.registerBus(this.busForm.value).subscribe((data)=>{
          this.successmsg=data.message
      })
    }
  }

}
