import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs-compat/subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  form: any;
  isLoading=false;
  private loadingSubs: Subscription

  constructor(private authService:AuthService, private router:Router, private auth:Auth,
    private snackBar:MatSnackBar,
    private uiService:UIService){}

  ngOnInit(): void {
    this.loadingSubs=this.uiService.loadingStateChaged.subscribe(isLoading=>{
      this.isLoading=isLoading;
    });
      this.loginForm=new FormGroup({
        email: new FormControl('',{validators:[Validators.required, Validators.email]}),
        password: new FormControl('',{validators:[Validators.required]})
      });
  }

  onSubmit(){
    this.authService.login({
      email:this.loginForm.value.email,
      password: this.loginForm.value.password

    });
  }

  loginWithGoogle(){
    this.authService.signInWithGoogle().then((res:any)=>{
      this.router.navigateByUrl('training');
    }).catch((error:any)=>{
      console.error(error);
  })
  }

  handleLogin(value:any){
    this.uiService.loadingStateChaged.next(true);   
    signInWithEmailAndPassword(this.auth, value.email, value.password)
    .then((response:any)=>{
     this.authService.authSuccessfully();
      //console.log(response.user)
      this.uiService.loadingStateChaged.next(false);
    })
    .catch((error:any)=>{
      this.uiService.loadingStateChaged.next(false);
      this.snackBar.open(error.message, null, {
        duration:3000
      });
  })
  }

  loginWithEmailAndPassword(){
    const userData=Object.assign(this.loginForm.value,{email: this.loginForm.value.username});
    this.authService.signWithEmailAndPassword(userData).then((res:any)=>{
    this.router.navigate(['/training'])
    }).catch((error:any)=>{
      this.snackBar.open(error.message, null, {
        duration:3000
      });
  })
  }

  ngOnDestroy(): void {
      this.loadingSubs.unsubscribe();
  }
}
