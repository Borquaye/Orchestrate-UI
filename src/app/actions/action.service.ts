import { Injectable } from '@angular/core';
import {Action} from "app/actions/action.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {ACTION_STATUS} from "app/shared/action-status.enum";
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';

@Injectable()
export class ActionService {
  actionItems: FirebaseListObservable<any[]>;
  action: FirebaseObjectObservable<any>;  

  constructor(private db: AngularFireDatabase) {
    this.actionItems = db.list('https://meetinganalasys.firebaseio.com/new');
  }

  addAction(action: Action) {
    this.actionItems.push(action);
  }

  getAction(id: number) {
    this.action = this.db.object('https://meetinganalasys.firebaseio.com/new/'+id);
  }
}
