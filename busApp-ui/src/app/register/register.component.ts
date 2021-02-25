import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl,Validators} from '@angular/forms';
import { BusService } from '../bus.service';
import { NumberFormatStyle } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder,private bus:BusService) { }

  errormessage:string;
  successmsg:string;
  registerForm=this.fb.group({
      'Name': ['',[Validators.required,Validators.pattern(/^([a-zA-z]+\s)*[A-z]+$/)]],
      'MobileNumber': ['',[Validators.required,Validators.pattern(/^[6-9][0-9]{9}$/)]],
      'Email': ['',[Validators.required,Validators.email]],
      'Password': ['',[Validators.required,Validators.minLength(6)]],
      'type':['',[Validators.required]]
  })

  get userName(){
    return this.registerForm.get('Name')
  }

  get mobileNumber(){
    return this.registerForm.get('MobileNumber')
  }

  get email(){
    return this.registerForm.get('Email')
  }
  
  get password(){
    return this.registerForm.get('Password')
  }
  get type(){
    return this.registerForm.get('type')
  }
  send(){
    if(this.registerForm.valid){
    if(this.registerForm.value.type=='Operator'){
      
      this.bus.registerOperator(this.registerForm.value).subscribe((response)=>{
        console.log(response)
        if(response.flag){
          this.successmsg="Registered Successfully. Your userId is "+response.operatorId+". Please login to continue!";
          this.errormessage=''
        }
        else{
          this.errormessage=response.message
        }
      })

    }
    else{

      this.bus.registerUser(this.registerForm.value).subscribe((response)=>{
        console.log(response)
        if(response.flag){
          this.successmsg="Registered Successfully. Your userId is "+response.userId+". Please login to continue!";
          this.errormessage=''
        }
        else{
          this.errormessage=response.message
        }
      })
      
    }
  }

  }

  ngOnInit(): void {
  }

}
