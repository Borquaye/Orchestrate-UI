import { Injectable } from '@angular/core';
import {Meeting} from 'app/meeting/meeting.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Agenda} from 'app/agendas/agenda.model';
import {Attendee} from 'app/attendees/attendee.model';
import { Action } from 'rxjs/scheduler/Action';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class MeetingService {
  meetings: FirebaseListObservable<any[]>;
  meeting: FirebaseObjectObservable<any>;

  constructor(db: AngularFireDatabase) {
    this.meetings = db.list('https://meetinganalasys.firebaseio.com/meetings');
    this.meeting = db.object('https://meetinganalasys.firebaseio.com/meetings/super_important_meeting_1');
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

  getMeeting(title: string) {

  }

  editMeeting(meeting: Meeting) {

  }

  removeMeeting(id: number) {

  }
}
