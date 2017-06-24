import { Injectable } from '@angular/core';
import { Attendee } from 'app/attendees/attendee.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';

@Injectable()
export class AttendeeService {
    _attendees: any[];
    _attendee: any;
  attendees: FirebaseListObservable<any[]>;
  attendee: FirebaseObjectObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.attendees = db.list('https://meetinganalasys.firebaseio.com/users');
  }
  addAttendee(attendee: Attendee) {
    this.attendees.push(attendee);
  }

  getAttendee(key: string, afterFirebase: Function) {
      this.db.object('https://meetinganalasys.firebaseio.com/users/' + key, { preserveSnapshot: true})
      .subscribe(snapshot => {
        const currentObject = { key: snapshot.key, value: snapshot.val() }
        this._attendee = currentObject;
        if (afterFirebase != null) {
          afterFirebase(currentObject);
        }
      });
  }
  getAttendees(afterFirebase: Function) {
      this.db.object('https://meetinganalasys.firebaseio.com/users/', { preserveSnapshot: true})
      .subscribe(snapshots => {
        let tempArray = [];
        snapshots.forEach(snapshot => {
          const currentObject = {key: snapshot.key, value: snapshot.val()};
          tempArray.push(currentObject);
          // console.log(snapshot.key, snapshot.val());
        });
        this._attendees = tempArray;
        if (afterFirebase != null) {
          afterFirebase(tempArray);
        }
        tempArray = [];
      });
  }
  editAttendee(attendee: Attendee) {

  }

  removeAttendee(id: string) {
    this.attendee.remove();
  }

}
