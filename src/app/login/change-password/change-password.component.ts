import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm:FormGroup;
  baseUrl:any='http://localhost:5000/tweetapp/';
  constructor(private route:Router,private toastr:ToastrService,private http:HttpClient) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.changePasswordForm=new FormGroup({
      password:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]),
      confirmPassword:new FormControl('',[Validators.required,this.matchValues('password')])
    })
    this.changePasswordForm.controls.password.valueChanges.subscribe(()=>{
      this.changePasswordForm.controls.confirmPassword.updateValueAndValidity();
    })
  }
  matchValues(matchTo:string):ValidatorFn{
    return(control:AbstractControl) => {
      return control?.value=== control?.parent?.controls[matchTo].value? null: {isMatching: true}
    }
  }
  changePassword(){
    let updatePasswordUrl=this.baseUrl+'resetPassword/user'
    let loginId=localStorage.getItem('username');
    let jsonPayload={
      loginId:loginId,
      password:this.changePasswordForm.value.password
    }
    if(this.changePasswordForm.valid){
      this.http.post(updatePasswordUrl,jsonPayload).subscribe(result=>{
        this.toastr.success('Updated Successfully');
        location.reload();
        localStorage.removeItem('username');
      },
      error=>{
        this.toastr.error(error.error);
      })
    }
    
    
    
    
    // console.log("Password Value::::",this.changePasswordForm.value.password)
    

  }
}
