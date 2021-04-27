import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private toastr:ToastrService,private router:Router){}
  canActivate(): boolean {
    if(this.authService.loggedIn()){
      return true;
    }
    else{
      this.toastr.error("You are not authenticated")
      this.router.navigate(['/login'])
    }
  }

}
