import { Component, OnInit, inject, OnDestroy } from '@angular/core';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators'

import { Firestore, collectionData, collection, getDocs } from '@angular/fire/firestore';




@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Observable<any>;
  exercises$: any[] = [];
  exerciseSubscription:Subscription;
  isLoading=true;
  //firestore: Firestore = inject(Firestore);


  constructor(
    private trainingService: TrainingService,
    private firestore: Firestore
  ) {

  }

  ngOnInit() {
    // this.exercises=this.trainingService.getAvaibleExercises();
    const collectionInstance = collection(this.firestore, 'avaibleExercises')
    collectionData(collectionInstance)
      .subscribe(val => {
        this.isLoading=false;
        console.log(val)
      })

    this.exercises = collectionData(collectionInstance)
    

   /*this.exerciseSubscription= this.trainingService.exercisesChanged.subscribe(exercises=>this.exercises=this.exercises);
    this.trainingService.fetchAvaibleExercises();*/
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    if(this.exerciseSubscription){
      this.exerciseSubscription.unsubscribe();
    }
  }

}
