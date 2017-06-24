import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AgendaService } from 'app/agendas/agenda.service';
import { AttendeeService } from 'app/attendees/attendee.service';
import { Observable } from 'rxjs/Observable';
import { Attendee } from 'app/attendees/attendee.model';


@Component({
  selector: 'orc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orc';
  attendeeName: string;
  attendees: Observable<Attendee[]>;

  usersTest: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase, private _agendaService: AgendaService, private _attendeeService: AttendeeService) {
    // this.attendees = _attendeeService.attendees;
    this.usersTest = _attendeeService.attendees;
  }

  addAttendee(name: string) {
    this._attendeeService.addAttendee(new Attendee(name));
  }
}
