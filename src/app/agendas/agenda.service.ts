import { Injectable } from '@angular/core';
import { Agenda } from 'app/agendas/agenda.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class AgendaService {
  agendaItems: FirebaseListObservable<any[]>;


  constructor(private _http: Http, db: AngularFireDatabase) {
    this.agendaItems = db.list('https://meetinganalasys.firebaseio.com/new');
  }

  addAgenda(agenda: Agenda) {
    this.agendaItems.push(agenda);
  }

  getAgenda(id: number) {

  }

  editAttendee(attendee: Agenda) {

  }

  removeAttendee(id: number) {

  }
}
