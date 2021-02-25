import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  searchForm: FormGroup

  constructor(private route:Router,private fb:FormBuilder) { 
    this.searchForm=this.fb.group({
     source:['',Validators.required],
     destination:['',Validators.required],
     date:['',[Validators.required,this.validateDate]]
    })
  }




  ngOnInit(): void {
  }
  validateDate(input:FormControl){
    let date=input.value
    let vardate=new Date(date).setHours(0,0,0,0);
    let today=new Date().setHours(0,0,0,0);
    return vardate < today?{"dateError":{"message":"Invalid Date"}}:null
  }

  get searchDate(){
    return this.searchForm.get('date')
  }

  search(){
    if(this.searchForm.valid){
      this.route.navigateByUrl('listbus?source='+this.searchForm.value.source+'&dest='+this.searchForm.value.destination+'&date='+this.searchForm.value.date)
      console.log('listbus?source='+this.searchForm.value.source+'&dest='+this.searchForm.value.destination+'&date='+this.searchForm.value.date)
    }
  }

}

 