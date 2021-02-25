import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isUser:String
  isOperator:String
  constructor() { 
    this.isUser=localStorage.getItem('userName')
    this.isOperator=localStorage.getItem('operatorName')
  }

  logout(){
    localStorage.clear()
    window.location.replace('/userhome')
  }

  
  ngOnInit(): void {
  }

}
