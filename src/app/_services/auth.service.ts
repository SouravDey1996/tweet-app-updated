import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// baseUrl:'http://localhost:5000/tweetapp/';
jwtHelper = new JwtHelperService();
decodedToken:any;


constructor(private http: HttpClient) { }
login(model: any) {
  return this.http.post('http://localhost:5000/tweetapp/login/user', model).pipe(
    map((response: any) => {
      // console.log("Error:::",response);
      const user = response;

      if (user) {
        localStorage.setItem('token', user);
        this.decodedToken = localStorage.getItem('token');
        
        console.log(this.decodedToken);
      }
    })
  );
}

loggedIn(){
  const token=localStorage.getItem('token');
  if(token!=null)
  {
    // this.currentUserSource.next(user)
    return true;
    
  }
  else{
    return false;
  }
}

}
