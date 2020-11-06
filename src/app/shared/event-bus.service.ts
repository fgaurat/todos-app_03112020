import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Action } from '../core/action';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  
  private actionSource= new Subject<Action>();
  public bus$ = this.actionSource.asObservable()

  constructor() { }

  dispatch(action:Action){
    console.log(action)
    this.actionSource.next(action);
  }
}
