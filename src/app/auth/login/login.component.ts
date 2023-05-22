import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  form: any;

  constructor(private authService:AuthService, private router:Router, private auth:Auth){}

  ngOnInit(): void {
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
    signInWithEmailAndPassword(this.auth, value.email, value.password)
    .then((response:any)=>{
      this.authService.authSuccessfully();
      console.log(response.user)
    })
    .catch((err)=>{
      alert(err.message);
    })
  }

  loginWithEmailAndPassword(){
    const userData=Object.assign(this.loginForm.value,{email: this.loginForm.value.username});
    this.authService.signWithEmailAndPassword(userData).then((res:any)=>{
    this.router.navigate(['/training'])
    }).catch((error:any)=>{
      console.error(error);
  })
  }
}
