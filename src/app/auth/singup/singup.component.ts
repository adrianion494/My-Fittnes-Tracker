import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import {  Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription, Observable } from 'rxjs';
import * as fromApp from 'src/app/app.reducer';
import { Store } from "@ngrx/store";
import {map} from 'rxjs/operators';
import { state } from '@angular/animations';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnDestroy {
  maxDate=new Date();
  registerForm:FormGroup=new FormGroup({
    email: new FormControl('',{validators:[Validators.required, Validators.email]}),
    password: new FormControl('',{validators:[Validators.required]})
})
isLoading$=Observable<boolean>;
isLoading =false;
private loadingSubs: Subscription;

email:string;
password:string;

  constructor(private authService:AuthService,
    private firestore:Firestore,
    private router:Router,
    private auth:Auth,
    private snackBar:MatSnackBar,
    private uiService:UIService,
    private store:Store<{ui: fromApp.State}>
    ){

  }

  

  ngOnInit(rF:FormGroup){
    this.store.subscribe(data=>console.log(data));
   // this.isLoading$=this.store.pipe(map(state=>state.ui.isLoading));
  this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  
  email: new FormControl('',{validators:[Validators.required, Validators.email]});
  password: new FormControl('',{validators:[Validators.required]});

  this.loadingSubs=this.uiService.loadingStateChaged.subscribe(isLoading=>{
    this.isLoading=isLoading;
  });
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
    //this.uiService.loadingStateChaged.next(true);
    this.store.dispatch({type:'START_LOADING'}); 
    createUserWithEmailAndPassword(this.auth, value.email, value.password)
    .then((response:any)=>{
      //this.uiService.loadingStateChaged.next(false); 
      this.authService.authSuccessfully();
      console.log(response.user)
      this.store.dispatch({type:'STOP_LOADING'}); 
    })
    .catch((err)=>{
      //this.uiService.loadingStateChaged.next(false); 
      this.store.dispatch({type:'STOP_LOADING'}); 
      alert(err.message);
    })
  }

  registerWithEmailAndPassword(){
    
    const userData=Object.assign(this.registerForm.value,{email: this.registerForm.value.email});
    this.authService.registerWithEmailAndPassword(userData).then((res:any)=>{
    this.router.navigateByUrl('login');
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
