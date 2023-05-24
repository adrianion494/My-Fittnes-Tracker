import { NgModule } from "@angular/core";

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import {  ReactiveFormsModule } from "@angular/forms";
import { StopTrainingComponent } from "./current-training/stop-training.component";
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent],
    imports: [
    ReactiveFormsModule,
    AngularFireAuthModule,
    SharedModule],
    exports: [],
    entryComponents:[StopTrainingComponent]
})
export class TrainingModule{}