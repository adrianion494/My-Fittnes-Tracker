import { Component, OnInit, inject } from '@angular/core';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { Firestore, collectionData, collection, getDocs } from '@angular/fire/firestore';




@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<any[]>;
  exercises$: any[] = [];
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
        console.log(val)
      })

    this.exercises = collectionData(collectionInstance)
    
    







  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
