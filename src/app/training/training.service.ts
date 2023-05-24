import { Subject } from "rxjs-compat/Subject";
import { UIService } from 'src/app/shared/ui.service';
import { Exercise } from "./exercise.model";;
import { Firestore, collectionData, collection, getDocs, addDoc, } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";

@Injectable()
export class TrainingService {
exerciseChanged=new Subject<Exercise>();
exercisesChanged=new Subject<Exercise[]>();

    private avaibleExercises: Exercise[] = [
        /*{ id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }*/
    ];
    private runningExercise: Exercise;
    private exercises:Exercise[]=[];

    constructor(private firestore:Firestore, private uiService:UIService){

    }

    private allDocs:any[]=[];
    

    getAvaibleExercises(){
        return this.avaibleExercises.slice();
    }

    fetchAvaibleExercises(){
        const collectionInstance = collection(this.firestore, 'avaibleExercises')
        collectionData(collectionInstance)
        .subscribe((exercises:Exercise[])=> {
        this.avaibleExercises=exercises;
        this.exercisesChanged.next([...this.avaibleExercises]);
      },
       error=>{
        this.uiService.showSanckbar('Fetching Exercises failed, please try again later', null, 3000)
      })
    }

    startExercise(selectedId: string){
        this.runningExercise=this.avaibleExercises.find(ex=>ex.id===selectedId);
        this.exerciseChanged.next({...this.runningExercise});
    }

    completeExercise(){
        this.addDataToDataBase({
            ...this.runningExercise,
            date:new Date(),
            state:'completed'
        });
        this.runningExercise=null;
        this.exerciseChanged.next(null);
    }

    cancelExerceise(progress:number){
        this.addDataToDataBase({
            ...this.runningExercise,
            duration:this.runningExercise.duration*(progress/100),
            calories:this.runningExercise.calories*(progress/100),
            date:new Date(),
            state:'cancelled'
        });
        this.runningExercise=null;
        this.exerciseChanged.next(null);
    }


    getRunningExercise(){
        return{...this.runningExercise};
    }

    getCompletedOrCanceledExercises(){
        return this.exercises.slice();
    }

    private addDataToDataBase(exercise:Exercise){
        const collectionInstance=collection(this.firestore, 'finishedExercises');
     addDoc(collectionInstance, exercise)
     .then(()=>{
      console.log("Data Saved Successfully");
     })
     .catch((err)=>{
      console.log(err);
     })
    }
}