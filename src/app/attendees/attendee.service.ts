import { Injectable } from '@angular/core';
import { Attendee } from 'app/attendees/attendee.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()
export class AttendeeService {
  attendees: FirebaseListObservable<any[]>;


  constructor(private _http: Http, db: AngularFireDatabase) {
    this.attendees = db.list('https://meetinganalasys.firebaseio.com/users');
  }

  getAttendees() {
    // this._http.get(backendUrl, options)
    //   .subscribe(result => {
    //     this.dataStore.attendees = result;
    //     this._attendees.next(Object.assign({}, this.dataStore).attendees);
    //   })
  }

  addAttendee(attendee: Attendee) {
    this.attendees.push(attendee);
  }

  getAttendee(id: number) {

  }

  editAttendee(attendee: Attendee) {
  }

  removeAttendee(id: number) {
  }

}
