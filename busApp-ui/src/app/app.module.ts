import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { ViewBusComponent } from './view-bus/view-bus.component';
import { SeatLayoutComponent } from './seat-layout/seat-layout.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { OperatorHomeComponent } from './operator-home/operator-home.component';
import { AddbusComponent } from './addbus/addbus.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavComponent,
    FooterComponent,
    UserhomeComponent,
    ViewBusComponent,
    SeatLayoutComponent,
    ViewBookingComponent,
    ViewProfileComponent,
    OperatorHomeComponent,
    AddbusComponent

  ],
  entryComponents:[SeatLayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
