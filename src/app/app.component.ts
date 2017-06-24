
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


    ngOnInit() {

    this._signalR.connect().then((c) => {

      let onMessageSent = new BroadcastEventListener<any>('SpeechRecognised');
      c.listen(onMessageSent)
      onMessageSent.subscribe((msg: any) => {

        let intent = msg.intent;
        let entity = msg.entity;

        console.log("intent: " + intent);
        console.log("entity: " + entity);

      });

    });

  }


  attendeeName: string;
  attendees: Observable<Attendee[]>;

  usersTest: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase, private _agendaService: AgendaService, private _attendeeService: AttendeeService, private _signalR: SignalR) {
    // this.attendees = _attendeeService.attendees;
    this.usersTest = _attendeeService.attendees;
  }

  addAttendee(name: string) {
    this._attendeeService.addAttendee(new Attendee(name));
  }

}
