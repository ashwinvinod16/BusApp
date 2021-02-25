import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { ViewBusComponent } from './view-bus/view-bus.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { OperatorHomeComponent } from './operator-home/operator-home.component';
import { AddbusComponent } from './addbus/addbus.component';


const routes: Routes = [
  {path:'login',
component:LoginComponent},
{
  path:'register',
  component:RegisterComponent
},
{
  path:'',
  component:UserhomeComponent
},

{
  path:'userhome',
  component:UserhomeComponent
},
{
  path:'operatorhome',
  component:OperatorHomeComponent
},
{
  path:'listbus',
  component:ViewBusComponent
},
{
  path:'bookedTicket/:id',
  component:ViewBookingComponent
},
{
  path:'viewprofile',
  component:ViewProfileComponent
},
{
  path:'addbus',
  component:AddbusComponent
},
{
  path:'**',
  component:UserhomeComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
