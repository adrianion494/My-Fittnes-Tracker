import { Subject } from "rxjs-compat/Subject";

export class UIService{

    loadingStateChaged=new Subject<boolean>();
}