import { Component, OnInit, Input, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA,MatDialog,MatDialogRef } from '@angular/material/dialog';
import { BusService } from '../bus.service';

@Component({
  selector: 'app-seat-layout',
  templateUrl: './seat-layout.component.html',
  styleUrls: ['./seat-layout.component.css']
})
export class SeatLayoutComponent implements OnInit {
seatsLayout
showSeatList:String[]=[]
total:number=0;
blockedSeat:String[]=[]

ticket:object
alert=false
departureDate:Date
rows = new Array();


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private bus:BusService,private dialogRef:MatDialogRef<SeatLayoutComponent>) { 
  }





  ngOnInit(): void {
  

  this.departureDate=new Date(this.data.journeyDate)
    this.departureDate.setHours(this.data.selectedBus.Departuretime.substr(0,2))
    this.departureDate.setMinutes(this.data.selectedBus.Departuretime.substr(3,2))
    this.blockedSeat=this.data.selectedBus.regularPassenger
    this.bus.getBookedSeat(this.data.selectedBus.busID,this.departureDate).subscribe((data)=>{
       data.seat.forEach(element => {
         this.blockedSeat=this.blockedSeat.concat(element.seatNumber)
       });
       this.seatsLayout= {
        totalRows:9,
      seatsPerRow:4,
      seatNaming:'rowType',
      booked:this.blockedSeat  
     }

     var rows=new Array()
     var seatsInARow= new Array()
     var seatChar;
     if (this.seatsLayout != undefined && this.seatsLayout.hasOwnProperty('totalRows')){
       if(this.seatsLayout.seatNaming='rowType'){
         for(let row = 0 ; row<this.seatsLayout.totalRows; row++){
           for(let seats = 0; seats<this.seatsLayout.seatsPerRow; seats++){
             seatChar = String.fromCharCode(65 + seats)
             seatsInARow.push((row + 1).toString() + seatChar);
           }
           rows.push(seatsInARow);
           seatsInARow = new Array();
         }
       }
     }
     this.rows = rows

    })
 }



  seatAction(seat){
    console.log(seat)
    if(this.showSeatList.length<10){
    if(!this.showSeatList){
      this.showSeatList.push(seat)
      this.total=this.data.selectedBus.farePerPerson
      
    }
    else if(this.showSeatList.includes(seat)){
      this.showSeatList = this.showSeatList.filter(item => item !== seat);
      this.total=this.total-this.data.selectedBus.farePerPerson
    }
    else{
      this.showSeatList.push(seat)
      this.total=this.total+this.data.selectedBus.farePerPerson
    }
  }
  else{
    if(this.showSeatList.includes(seat)){
      this.showSeatList = this.showSeatList.filter(item => item !== seat);
      this.total=this.total-this.data.selectedBus.farePerPerson;
    }else{
   window.alert("You can buy only 10 seats in one time ")
    }
  }
}

  bookTicket(){

    this.ticket={
    "busID":this.data.selectedBus.busID,
    "busName":this.data.selectedBus.busName,
    "userName":localStorage.getItem('userName'),
    "userID":localStorage.getItem('userId'),
    "seatNumber":this.showSeatList,
    "source":this.data.selectedBus.startingPoint,
    "dest":this.data.selectedBus.endPoint,
    "Departure":this.departureDate,
    "dateOfBooKing":new Date(),
    "numberOfSeats":this.showSeatList.length,
    "totalFare":this.total,
    "status":"Booked"
    }
    this.bus.bookTicket(this.ticket).subscribe((data)=>{
      this.dialogRef.close(data)
    })
  }
 

}
