import { Injectable } from '@angular/core';
import {Action} from "app/actions/action.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http/http";
import {ACTION_STATUS} from "app/shared/action-status.enum";

@Injectable()
export class ActionService {
 private dataStore: {
    actions: Action[],
    currentAction: Action
  };

  private _actions: BehaviorSubject<Action[]>;
  public actions : Observable<Action[]>;

  private _currentAction: BehaviorSubject<Action>;
  public currentAction: Observable<Action>;
  
  constructor(private _http: Http) {
    this.dataStore = {
      actions: [
        { id: 1, name: 'bits', assignee: 'todd', status: ACTION_STATUS.COMPLETEED, deadline: Date.now() },
        { id: 2, name: 'get', assignee: 'ben', status: ACTION_STATUS.IN_PROGRESS, deadline: Date.now() },
        { id: 3, name: 'done', assignee: 'billy', status: ACTION_STATUS.COMPLETEED, deadline: Date.now() }
      ],
      currentAction: null
    }

    this._actions =  <BehaviorSubject<Action[]>>new BehaviorSubject([]);
    this.actions = this._actions.asObservable();

    this._currentAction =  <BehaviorSubject<Action>>new BehaviorSubject({});
    this.currentAction = this._currentAction.asObservable();

  }

  getActions() {
    // this._http.get(backendUrl, options)
    //   .subscribe(result => {
    //     this.dataStore.attendees = result;
    //     this._attendees.next(Object.assign({}, this.dataStore).attendees);
    //   })
  }

  addAction(action: Action) {
    // this._http.get(backendUrl, options)
    //   .subscribe(result => {
    //     // If result is successfull
    //     this.dataStore.attendees.push(attendee)
    //     this._attendees.next(Object.assign({}, this.dataStore).attendees);
    //   })

    this.dataStore.actions.push(action)
    this._actions.next(Object.assign({}, this.dataStore).actions);
  }

  getAction(id: number) {
    this.dataStore.currentAction = this.dataStore.actions.find(action => action.id === id);
    this._currentAction.next(Object.assign({}, this.dataStore).currentAction);
  }

  editAction(action: Action) {
    this.dataStore.actions.splice(action.id, 1, action)
    this._actions.next(Object.assign({}, this.dataStore).actions);
  }

  removeAction(id: number) {
    this.dataStore.actions.splice(id, 1)
    this._actions.next(Object.assign({}, this.dataStore).actions);
  }
}
