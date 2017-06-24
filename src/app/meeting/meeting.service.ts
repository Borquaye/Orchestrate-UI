import { Injectable } from '@angular/core';
import {Meeting} from "app/meeting/meeting.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http/http";
import {Agenda} from "app/agendas/agenda.model";
import {Attendee} from "app/atendees/atendee.model";
import {Action} from "rxjs/scheduler/Action";

@Injectable()
export class MeetingService {

private dataStore: {
    meetings: Meeting[],
    currentMeeting: Meeting
  };

  private _meetings: BehaviorSubject<Meeting[]>;
  public meetings : Observable<Meeting[]>;

  private _currentMeeting: BehaviorSubject<Meeting>;
  public currentMeeting: Observable<Meeting>;
  
  constructor(private _http: Http) {
    this.dataStore = {
      meetings: [
        { title: 'bits', attendees : [], agendaItems: [] },
        { title: 'get', attendees : [], agendaItems: []},
        { title: 'done', attendees : [], agendaItems: [] }
      ],
      currentMeeting: null
    }

    this._meetings =  <BehaviorSubject<Meeting[]>>new BehaviorSubject([]);
    this.meetings = this._meetings.asObservable();

    this._currentMeeting =  <BehaviorSubject<Meeting>>new BehaviorSubject({});
    this.currentMeeting = this._currentMeeting.asObservable();

  }

  getMeetings() {
    // this._http.get(backendUrl, options)
    //   .subscribe(result => {
    //     this.dataStore.attendees = result;
    //     this._attendees.next(Object.assign({}, this.dataStore).attendees);
    //   })
  }

  addMeeting(meeting: Meeting) {
    // this._http.get(backendUrl, options)
    //   .subscribe(result => {
    //     // If result is successfull
    //     this.dataStore.attendees.push(attendee)
    //     this._attendees.next(Object.assign({}, this.dataStore).attendees);
    //   })

    this.dataStore.meetings.push(meeting)
    this._meetings.next(Object.assign({}, this.dataStore).meetings);
  }

  getMeeting(title: string) {
    this.dataStore.currentMeeting = this.dataStore.meetings.find(meeting => meeting.title === title);
    this._currentMeeting.next(Object.assign({}, this.dataStore).currentMeeting);
  }

  editMeeting(meeting: Meeting) {
    this.dataStore.meetings.splice(1, 1, meeting)
    this._meetings.next(Object.assign({}, this.dataStore).meetings);
  }

  removeMeeting(id: number) {
    this.dataStore.meetings.splice(id, 1)
    this._meetings.next(Object.assign({}, this.dataStore).meetings);
  }
}
