import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusService } from '../bus.service';
import { MatDialog } from '@angular/material/dialog';
import { SeatLayoutComponent } from '../seat-layout/seat-layout.component';
import {Router} from '@angular/router'


@Component({
  selector: 'app-view-bus',
  templateUrl: './view-bus.component.html',
  styleUrls: ['./view-bus.component.css']
})
export class ViewBusComponent implements OnInit {
  source;
  dest;
  date
  busDetails;
  busName;
  successmsg

  constructor(private route:ActivatedRoute,private bus:BusService,private dialog:MatDialog,private router:Router) {
     this.route.queryParams.subscribe(params=>{
       this.source=params.source.toUpperCase();
       this.dest=params.dest.toUpperCase();
       this.date=params.date
       this.date=new Date(this.date).toDateString()
       this.bus.viewBus(this.source,this.dest).subscribe((data)=>{
         console.log(data)
         if(data){
           
           this.busDetails=data
           this.busDetails.forEach(element => {
             element.seat=36-element.regularPassenger.length
             element.Availability.forEach(element1 => {
                 if(element1.date==this.date){
                   element.seat=element1.seats-element.regularPassenger.length;
                 }      
             });
           });
           console.log(this.busDetails)
          }
         else
            this.busDetails=[]
       })
     })

     
   }

   openBusLayout(b){
     if(localStorage.getItem('userId')){
    const dialogRef=this.dialog.open(SeatLayoutComponent,{
      width:'80%',
      height:'80%',
      data:{
        selectedBus:b,
        journeyDate:this.date
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.successmsg=result.message
    });
  }
  else{
    this.router.navigateByUrl('/login')
  }
     
   }
  
   ngOnInit(): void {
    
  }

}
