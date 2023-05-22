import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import {  Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {
  maxDate=new Date();
  registerForm:FormGroup=new FormGroup({
    email: new FormControl('',{validators:[Validators.required, Validators.email]}),
    password: new FormControl('',{validators:[Validators.required]})
})

email:string;
password:string;

  constructor(private authService:AuthService,
    private firestore:Firestore,
    private router:Router,
    private auth:Auth
    ){

  }

  

  ngOnInit(rF:FormGroup){
  this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  
  email: new FormControl('',{validators:[Validators.required, Validators.email]});
  password: new FormControl('',{validators:[Validators.required]});
  }
  onSubmit(form:NgForm){
    /*this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
    */
     console.log(form.value);
     const collectionInstance=collection(this.firestore, 'users');
     addDoc(collectionInstance, form.value)
     .then(()=>{
      console.log("Data Saved Successfully");
     })
     .catch((err)=>{
      console.log(err);
     })

  }

  handleRegister(value:any){   
    createUserWithEmailAndPassword(this.auth, value.email, value.password)
    .then((response:any)=>{
      this.authService.authSuccessfully();
      console.log(response.user)
    })
    .catch((err)=>{
      alert(err.message);
    })
  }

  registerWithEmailAndPassword(){
    const userData=Object.assign(this.registerForm.value,{email: this.registerForm.value.email});
    this.authService.registerWithEmailAndPassword(userData).then((res:any)=>{
    this.router.navigateByUrl('login');
    }).catch((error:any)=>{
      console.error(error);
  })
  }

  

  

}
