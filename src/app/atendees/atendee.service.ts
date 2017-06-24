import { Injectable } from '@angular/core';
import { Attendee } from 'app/atendees/atendee.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

@Injectable()
export class AtendeeService {
  private dataStore: {
    attendees: Attendee[],
    currentAttendee: Attendee
  };

  private _attendees: BehaviorSubject<Attendee[]>;
  public attendees: Observable<Attendee[]>;

  private _currentAttendee: BehaviorSubject<Attendee>;
  public currentAttendee: Observable<Attendee>;
  
  constructor(private _http: Http) {
    this.dataStore = {
      attendees: [
        { id: 1, name: 'Daniel'},
        { id: 2, name: 'Joe'},
        { id: 3, name: 'Sam'}
      ],
      currentAttendee: null
    }

    this._attendees =  <BehaviorSubject<Attendee[]>>new BehaviorSubject([]);
    this.attendees = this._attendees.asObservable();

    this._currentAttendee =  <BehaviorSubject<Attendee>>new BehaviorSubject({});
    this.currentAttendee = this._currentAttendee.asObservable();

  }

  getAttendees() {
    // this._http.get(backendUrl, options)
    //   .subscribe(result => {
    //     this.dataStore.attendees = result;
    //     this._attendees.next(Object.assign({}, this.dataStore).attendees);
    //   })
  }

  addAttendee(attendee: Attendee) {
    // this._http.get(backendUrl, options)
    //   .subscribe(result => {
    //     // If result is successfull
    //     this.dataStore.attendees.push(attendee)
    //     this._attendees.next(Object.assign({}, this.dataStore).attendees);
    //   })

    this.dataStore.attendees.push(attendee)
    this._attendees.next(Object.assign({}, this.dataStore).attendees);
  }

  getAttendee(id: number) {
    this.dataStore.currentAttendee = this.dataStore.attendees.find(attendee => attendee.id === id);
    this._currentAttendee.next(Object.assign({}, this.dataStore).currentAttendee);
  }

  editAttendee(attendee: Attendee) {
    this.dataStore.attendees.splice(attendee.id, 1, attendee)
    this._attendees.next(Object.assign({}, this.dataStore).attendees);
  }

  removeAttendee(id: number) {
    this.dataStore.attendees.splice(id, 1)
    this._attendees.next(Object.assign({}, this.dataStore).attendees);
  }

}
