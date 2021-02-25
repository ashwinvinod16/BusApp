import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { BusService } from '../bus.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

 profileForm 
 userData
 successmsg
  constructor(private bus:BusService) {
    
    this.profileForm=new FormGroup({
  
      'Name':new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-z]+\s)*[A-z]+$/)]),
      'Email':new FormControl('',[Validators.required,Validators.email]),
      'MobileNumber':new FormControl('',[Validators.required,Validators.pattern(/^[6-9][0-9]{9}$/)])
  })
 
   }

   get userName(){
    return this.profileForm.get('Name')
  }

  get mobileNumber(){
    return this.profileForm.get('MobileNumber')
  }

  get email(){
    return this.profileForm.get('Email')
  }

  ngOnInit(): void {


    this.bus.getUserDetails(localStorage.getItem('userId')).subscribe((data)=>{
      this.userData=data.userDetail
  
       this.profileForm.setValue({Name: this.userData.Name, Email: this.userData.Email, MobileNumber:this.userData.MobileNumber})

      console.log(this.userData)
  })

  }
  

  update(){
    this.bus.updateProfile(localStorage.getItem('userId'),this.profileForm.value).subscribe((success)=>{
        this.successmsg=success.message
    })
  }


}
