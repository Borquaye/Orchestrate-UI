
import { Component, OnInit } from '@angular/core';
import { SignalR, BroadcastEventListener } from "ng2-signalr";
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
export class AppComponent implements OnInit {
  title = 'orc';
  attendeeName: string;
  attendees: FirebaseListObservable<Attendee[]>;

  constructor(
    db: AngularFireDatabase,
    private _agendaService: AgendaService,
    private _attendeeService: AttendeeService,
    private _signalR: SignalR
  ) {
    // this.attendees = _attendeeService.attendees;
    this.attendees = _attendeeService.attendees;
  }

  ngOnInit() {
    this._signalR.connect().then((c) => {

      const onMessageSent = new BroadcastEventListener<any>('SpeechRecognised');
      c.listen(onMessageSent)
      onMessageSent.subscribe((msg: any) => {

        const intent = msg.intent;
        const entity = msg.entity;

        console.log('intent: ' + intent);
        console.log('entity: ' + entity);

      });

    });
  }

  addAttendee(name: string) {
    this._attendeeService.addAttendee(new Attendee(name));
  }

}
