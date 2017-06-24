import { Injectable } from '@angular/core';
import { Attendee } from 'app/attendees/attendee.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';

@Injectable()
export class AttendeeService {
  attendees: FirebaseListObservable<any[]>;
  attendee: FirebaseObjectObservable<any>;  

  constructor(private db: AngularFireDatabase) {
    this.attendees = db.list('https://meetinganalasys.firebaseio.com/new');
  }

  addAttendee(attendee: Attendee) {
    this.attendees.push(attendee);
  }

  getAttendee(id: string) {
    this.attendee = this.db.object("https://meetinganalasys.firebaseio.com/new/"+id);
  }

  editAttendee(attendee: Attendee) {

  }

  removeAttendee(id: string) {

  }

}
