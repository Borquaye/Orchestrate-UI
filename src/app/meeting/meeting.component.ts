import { Component, OnInit } from '@angular/core';
import { MeetingService } from 'app/meeting/meeting.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {AttendeeService} from 'app/attendees/attendee.service';
import {Attendee} from 'app/attendees/attendee.model';
import {ActionService} from 'app/actions/action.service';
import {Action} from 'app/actions/action.model';

@Component({
  selector: 'orc-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})

export class MeetingComponent {
  meeting: FirebaseObjectObservable<any>;
  _meeting: any;
  actionsItems: FirebaseListObservable < any[] >;
  attendees: FirebaseListObservable < Attendee[] >;
  meetingAgendas: any[];

  constructor(
        private _attendeeService: AttendeeService,
        private _actionService: ActionService,
        private _meetingService: MeetingService
  ) {
    this.attendees = _attendeeService.attendees;
    this.actionsItems = _actionService.actionItems;
    this.meeting = this._meetingService.meeting;
    const me = this;
    me.meetingAgendas = [];

    this._meetingService.getMeeting('super_important_meeting_1', (data) => {
      me._meeting = this._meetingService._meeting;
      for (let o = 0; o < Object.keys(me._meeting.value.agendaItems).length; o++) {
        me.meetingAgendas.push(me._meeting.value.agendaItems[Object.keys(me._meeting.value.agendaItems)[o]]);
      }
      for (let v = 0; v < Object.keys(me.meetingAgendas).length; v++) {
        for(let z=0; z < me.meetingAgendas[v].actions.length; z++){
          me.actionsItems.push(me.meetingAgendas[v].action[z]);
        } 
      }
    });
  }

  addAttendee(name: string) {
    this._attendeeService.addAttendee(new Attendee(name));
  }

  removeAttendee(name: string) {
    this._attendeeService.removeAttendee(name);
  }

  addAction(name: string) {
    this._actionService.addAction(new Action(name));
  }

}
