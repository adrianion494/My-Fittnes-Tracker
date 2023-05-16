import { Subject } from "rxjs-compat/Subject";

import { Exercise } from "./exercise.model";;
import { Firestore, collectionData, collection, getDocs, } from '@angular/fire/firestore';


export class TrainingService {
exerciseChanged=new Subject<Exercise>();

    private avaibleExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];
    private runningExercise: Exercise;
    private exercises:Exercise[]=[];

    private allDocs:any[]=[];
    

    getAvaibleExercises(){
        return this.avaibleExercises.slice();
    }

    startExercise(selectedId: string){
        this.runningExercise=this.avaibleExercises.find(ex=>ex.id===selectedId);
        this.exerciseChanged.next({...this.runningExercise});
    }

    completeExercise(){
        this.exercises.push({
            ...this.runningExercise,
            date:new Date(),
            state:'completed'
        });
        this.runningExercise=null;
        this.exerciseChanged.next(null);
    }

    cancelExerceise(progress:number){
        this.exercises.push({
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

}