import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private http:HttpClient) { }

  registerUser(data):Observable<any>{
    return this.http.post(`http://localhost:4000/register/user`,data)
  }
  loginUser(data):Observable<any>{
    return this.http.post(`http://localhost:4000/login/user`,data)
  }

  registerOperator(data):Observable<any>{
    return this.http.post(`http://localhost:4000/register/operator`,data)
  }

  loginOperator(data):Observable<any>{
    return this.http.post(`http://localhost:4000/login/operator`,data)
  }
  
  viewBus(source,dest):Observable<any>{
    return this.http.get(`http://localhost:4000/viewBus/`+source+`/`+dest)
  }

  bookTicket(data):Observable<any>{
    return this.http.post(`http://localhost:4000/bookTicket`,data)
  }

  getBookedSeat(busid,depDate):Observable<any>{
    return this.http.get(`http://localhost:4000/bookDetails/`+depDate+`/`+busid)
  }
  
  getUpcommingJourney(userid):Observable<any>{
    return this.http.get(`http://localhost:4000/upcommingjourney/`+userid)
  }
  getCompletedJourney(userid):Observable<any>{
    return this.http.get(`http://localhost:4000/completedjourney/`+userid)
  }

  getCancelledJourney(userid):Observable<any>{
    return this.http.get(`http://localhost:4000/cancelledJourney/`+userid)
  }

  getUserDetails(userid):Observable<any>{
    return this.http.get(`http://localhost:4000/userData/`+userid)
  }

  updateProfile(userid,profileData):Observable<any>{
    return this.http.put(`http://localhost:4000/updateData/`+userid,profileData)
  }
  
  cancelTicket(ticketid):Observable<any>{
    return this.http.put(`http://localhost:4000/cancelTicket/`+ticketid,'')
  }

  operatorBus(oprid):Observable<any>{
    return this.http.get(`http://localhost:4000/operatoreWiseBus/`+oprid)
  }

  registerBus(busData):Observable<any>{
    return this.http.post(`http://localhost:4000/registerBus`,busData)
  }

}
