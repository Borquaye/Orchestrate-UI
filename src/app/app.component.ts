import { Component, OnInit } from '@angular/core';
import { SignalR, BroadcastEventListener } from 'ng2-signalr';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AgendaService } from 'app/agendas/agenda.service';
import { AttendeeService } from 'app/attendees/attendee.service';
import { Observable } from 'rxjs/Observable';
import { Attendee } from 'app/attendees/attendee.model';
import {SelectItem} from 'primeng/primeng';


@Component({
  selector: 'orc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'orc';
  attendeeName: string;
  attendees: any[]; // FirebaseListObservable<Attendee[]>;
  results: SelectItem[];
  selectedItems: string[];

  constructor(
    db: AngularFireDatabase,
    private _agendaService: AgendaService,
    private _attendeeService: AttendeeService,
    private _signalR: SignalR
  ) {
    // this.attendees = _attendeeService.attendees;
    const me = this;
    me.attendees = [];
    this._attendeeService.getAttendees((data) => {
      me.attendees = data;
      const temp = [];
      for (let i = 0; i < me.attendees.length; i++) {
        temp.push({ label: me.attendees[i].value.username, value: me.attendees[i].value.username})
      }
      me.results = temp;
      // for (let o = 0; o < Object.keys(me._meeting.value.agendaItems).length; o++) {
      //   me.attendees.push(me._meeting.value.agendaItems[Object.keys(me._meeting.value.agendaItems)[o]]);
      // }
    });
    //this.attendees = _attendeeService.attendees;
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
