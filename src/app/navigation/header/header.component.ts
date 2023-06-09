import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs-compat/subscription';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
 @Output() sidenavToggle= new EventEmitter<void>();
 isAuth: boolean=false;
 authSubcription: Subscription;

  constructor( private authService:AuthService){

  }

  ngOnInit(){
    this.authSubcription=this.authService.authChange.subscribe(authStatus=>{
      this.isAuth=authStatus;
    });
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }

  onLogout(){
   this.authService.logout();
  }


  ngOnDestroy(){
    this.authSubcription.unsubscribe();
  }
  
}

