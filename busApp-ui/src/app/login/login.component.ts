import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { BusService } from '../bus.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private bus:BusService) { }

  loginForm=this.fb.group({
    'userName': ['',[Validators.required]],
    'Password': ['',[Validators.required]],
    'type':['',[Validators.required]]

  })



  errormessage
  token

  get email(){
    return this.loginForm.get('userName')
  }
  
  get password(){
    return this.loginForm.get('Password')
  }
  get type(){
    return this.loginForm.get('type')
  }

  send(){
    if(this.loginForm.valid){
      if(this.loginForm.value.type=='Operator'){
      this.bus.loginOperator(this.loginForm.value).subscribe((data)=>{
        this.errormessage=data.message
        console.log(data)
        this.token=data.token
        if (data.message==""){
          localStorage.setItem('token',data.token)
          localStorage.setItem('operatorName',data.name)
          localStorage.setItem('operatorId',data.id)
          window.location.replace('/operatorhome')
        }
      })
    }
    else{

      this.bus.loginUser(this.loginForm.value).subscribe((data)=>{
        this.errormessage=data.message
        console.log(data)
        this.token=data.token
        if (data.message==""){
          localStorage.setItem('token',data.token)
          localStorage.setItem('userName',data.name)
          localStorage.setItem('userId',data.id)
          window.location.replace('/userhome')
        }
      })

    }
    }

  }  


  ngOnInit(): void {
  }

}
