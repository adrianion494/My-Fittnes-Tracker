import {Injectable} from "@angular/core"
import { Subject } from "rxjs-compat/Subject";
import "firebase/auth";

import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { FirebaseApp } from "@angular/fire/app";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable(
    {
        providedIn:"root"
    }
)
export class AuthService{
    authChange=new Subject<boolean>();
    private user: User;

    constructor(private router:Router, 
        private afAuth:AngularFireAuth,
        private snackBar:MatSnackBar){
        //this.auth=firebase.auth;
    }

    initAuthListener(){
        this.afAuth.authState.subscribe(user=>{
           if (user){
            this.authChange.next(true);
            this.router.navigate(['/training']);
           } 
           else{
            this.user=null;
            this.authChange.next(false);
            this.router.navigate(['/login']);
           } 
        });
    }

    signInWithGoogle(){
        return this.afAuth.signInWithPopup(new GoogleAuthProvider());
       
    }

    registerWithEmailAndPassword(usr: {email:string, password:string} ){
        return this.afAuth.createUserWithEmailAndPassword(usr.email, usr.password);
    }

    signWithEmailAndPassword(usr: {email:string, password:string} ){
        return this.afAuth.signInWithEmailAndPassword(usr.email, usr.password);
    }



    registerUser(authData: AuthData){
       this.user={
            email:authData.email,
            userId:Math.round(Math.random()*1000).toString()
        };

       this.authSuccessfully();

        
        }
    
    login(authData:AuthData){
        this.user={
            email:authData.email,
            userId:Math.round(Math.random()*1000).toString()
        };
        this.authSuccessfully();
        
    }

    logout(){
        this.user=null;

        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser(){
        return {...this.user};
    }

    isAuth(){
        return this.user!=null;
    }

    authSuccessfully(){
        this.authChange.next(true);
        this.router.navigate(['/training']);
    } 
}