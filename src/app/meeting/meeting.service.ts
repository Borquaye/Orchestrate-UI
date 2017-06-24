import { Injectable } from '@angular/core';
import {Meeting} from 'app/meeting/meeting.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Agenda} from 'app/agendas/agenda.model';
import {Attendee} from 'app/attendees/attendee.model';
import { Action } from 'rxjs/scheduler/Action';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class MeetingService {

  meetings: FirebaseListObservable<any[]>;
  meeting: FirebaseObjectObservable<any>;
  _meeting: any;
  _meetings: any [];

  constructor(private db: AngularFireDatabase) {
    // db.list('https://meetinganalasys.firebaseio.com/meetings/super_important_meeting_1', { preserveSnapshot: true})
    //   .subscribe(snapshot => {
    //     let tempArray = [];
    //     // snapshots.forEach(snapshot => {
    //       const currentObject = {key: snapshot.key, value: snapshot.val()}
    //       tempArray.push(currentObject);
    //       console.log(snapshot.key, snapshot.val());
    //     // });
    //     this._meetings = tempArray;
    //     tempArray = [];
    //   });

      this.getMeeting('super_important_meeting_1', null);
  }

  getMeetings() {
    // this._http.get(backendUrl, options)
    //   .subscribe(result => {
    //     this.dataStore.attendees = result;
    //     this._attendees.next(Object.assign({}, this.dataStore).attendees);
    //   })
  }

  addMeeting(meeting: Meeting) {

  }

  getMeeting(key: string, afterFirebase: Function): Subscription {
    return this.db.object('https://meetinganalasys.firebaseio.com/meetings/' + key, { preserveSnapshot: true})
      .subscribe(snapshot => {
        const currentObject = { key: snapshot.key, value: snapshot.val() }
        this._meeting = currentObject;
        if (afterFirebase != null) {
          afterFirebase(currentObject);
        }
      });
  }

  editMeeting(meeting: Meeting) {

  }

  removeMeeting(id: number) {

  }
}
