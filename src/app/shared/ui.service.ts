import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs-compat/Subject";

@Injectable()
export class UIService{

   
    loadingStateChaged=new Subject<boolean>();

    constructor(private snackbar:MatSnackBar){

    }

    showSanckbar(message,action,duration){
        this.snackbar.open(message,action,{
            duration:duration
        });
    }
}