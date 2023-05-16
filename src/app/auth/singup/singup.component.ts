import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms/';
import { AuthService } from '../auth.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {
  maxDate=new Date();

  constructor(private authService:AuthService,
    private firestore:Firestore
    ){

  }

  ngOnInit(){
  this.maxDate.setFullYear(this.maxDate.getFullYear()-18);

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

}
