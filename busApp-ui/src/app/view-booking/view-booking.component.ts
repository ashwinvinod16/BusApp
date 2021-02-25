import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusService } from '../bus.service';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {
 
  category
  Tickets
  currentTime
  cancel:boolean
   
  constructor(private route:ActivatedRoute,private bus:BusService) { 
    this.route.params.subscribe(params => {
      this.category=this.route.snapshot.params.id
      this.currentTime=new Date()
      if(this.category=='UpcomingJourney'){
         this.bus.getUpcommingJourney(localStorage.getItem('userId')).subscribe((data)=>{
           this.Tickets=data.bookedTicket
           this.cancel=true
           this.Tickets.forEach(element => {
             if( (new Date(element.Departure).getDate()!=this.currentTime.getDate()) && new Date(element.Departure).getMonth()!=this.currentTime.getMonth ){
               element.cancel=true
             }
             else if(Math.abs((this.currentTime.getTime()-new Date(element.Departure).getTime())/3600000)<5){
                   element.cancel=false
             }
             else{
               element.cancel=true
             }

           });
           
  
         })
      }
      else if(this.category=='CompletedJourney'){
        this.bus.getCompletedJourney(localStorage.getItem('userId')).subscribe((data)=>{
          this.Tickets=data.bookedTicket
          this.cancel=false
        })

      }
      else{
        this.bus.getCancelledJourney(localStorage.getItem('userId')).subscribe((data)=>{
          this.Tickets=data.cancelledTicket
          this.cancel=false
        })

      }
  })
}

  ngOnInit(): void {
  }

  cancelTicket(ticketid){
    this.bus.cancelTicket(ticketid).subscribe((cancelmsg)=>{
       
      console.log(cancelmsg)

    })
  }

}
