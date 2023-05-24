import { NgModule } from "@angular/core";

import { SingupComponent } from './singup/singup.component';
import { LoginComponent } from './login/login.component';
import {  ReactiveFormsModule } from "@angular/forms";
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        SingupComponent,
        LoginComponent,],
    imports: [
    ReactiveFormsModule,
    AngularFireAuthModule,
    SharedModule],
    exports: []
})
export class AuthModule{}