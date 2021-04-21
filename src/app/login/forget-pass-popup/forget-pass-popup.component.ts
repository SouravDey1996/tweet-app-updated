import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forget-pass-popup',
  templateUrl: './forget-pass-popup.component.html',
  styleUrls: ['./forget-pass-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ForgetPassPopupComponent implements OnInit {
otpSent:Boolean=false
otpValue:any;
otp:any;
loginId:any
validityFlag:Boolean=false
showOtherModal:Boolean=true
changePasswordForm:FormGroup;
  
baseUrl:any='https://tweetapp-api.azurewebsites.net/tweetapp/';
  constructor(private dialog: MatDialog,private http:HttpClient,private toastr:ToastrService,private route:Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }
   sendOtp(){
    //  console.log("sendOtp",this.loginId)
     let jsonPayLoad={
       "loginId":this.loginId
     }
     let sendOtpUrl=this.baseUrl+'sendOTP/user'
     this.http.post(sendOtpUrl,jsonPayLoad).subscribe(result=>{
      this.otp=result;
      console.log('OTP::',this.otp);
       this.toastr.success('Otp sent successfully')
       this.otpSent=true;
       this.validityFlag=false;
       this.showOtherModal=true
     },error=>{
       this.toastr.error(error.error);
     })
    
   }
   validateOtp(){
    //  console.log("OTP VAlue:::",this.otpValue)
    if(this.otpValue==this.otp){
      this.toastr.success('OTP validated Successfully!!')
      this.validityFlag=true;
      this.showOtherModal=false;
      // let dialogRef=this.dialog.open(ChangePasswordComponent,{
     
      //   width:'700px',
      //   height:'auto'
      // })
      // dialogRef.afterClosed().subscribe(result=>{
        
      // })
      localStorage.setItem('username',this.loginId);
      
    }
    else{
      this.toastr.error('Invalid OTP!!')
      this.validityFlag=false;
    }
    
    
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
        
        localStorage.removeItem('username');
        let dialogRef=this.dialog.closeAll()
      },
      error=>{
        this.toastr.error(error.error);
      })
    }
    
    
    
    
    // console.log("Password Value::::",this.changePasswordForm.value.password)
    

  }
}
