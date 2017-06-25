import { Component, OnInit } from '@angular/core';
import { MeetingService } from 'app/meeting/meeting.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {AttendeeService} from 'app/attendees/attendee.service';
import {Attendee} from 'app/attendees/attendee.model';
import {ActionService} from 'app/actions/action.service';
import {MdSnackBar} from "@angular/material";
import { Action } from 'app/actions/action.model';
import { SelectItem } from 'primeng/primeng';
import { Meeting } from 'app/meeting/meeting.model';
import { Agenda } from 'app/agendas/agenda.model';

@Component({
  selector: 'orc-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})

export class MeetingComponent {
  meeting: FirebaseObjectObservable<any>;
  _meeting: any;
  actionsItems: FirebaseListObservable < any[]>;
  attendees: FirebaseListObservable < Attendee[] >;
  meetingAgendas: any[];
  currentAgenda: any;

  users: any[];
  results: SelectItem[];

  mainMeeting: Meeting;
  theAgenda: Agenda;
  selectedItems: any;

  constructor(
        private _attendeeService: AttendeeService,
        private _actionService: ActionService,
        private _meetingService: MeetingService,
        public snackBar: MdSnackBar
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
        //
      }
      me.currentAgenda = me.meetingAgendas[0];
    });

    me.users = [];
    this._attendeeService.getAttendees((data) => {
      me.users = data;
      const temp = [];
      for (let i = 0; i < me.users.length; i++) {
        temp.push({ label: me.users[i].value.username, value: me.users[i].value.username})
      }
      // me.results = temp;
    });
    const usrs = [
      new Attendee('Kiran'),
      new Attendee('Adeeb'),
      new Attendee('Amari'),
      new Attendee('Joe'),
      new Attendee('Sam'),
      new Attendee('Mike')
    ];

    const ats = [new Attendee('Kiran'), new Attendee('Adeeb'), new Attendee('Amari')];
    const ag1 = new Agenda('Discuss The Problem');
    const ag2 = new Agenda('The Solution');
    const ac = new Action('Capture meeting audio');
    ac.assignee = 'Kiran';
    ag2.actions.push(ac);
    const ag3 = new Agenda('Questions & Answers');
    const ag  = [ag1, ag2, ag3];
    this.mainMeeting = new Meeting(
      'Orchestra Demo Meeting',
      [],
      ag,
      'Adeeb')

    const tmp = [];
    this.theAgenda = this.mainMeeting.agendaItems[0];
    for (let i = 0; i < usrs.length; i++) {
        tmp.push({ label: usrs[i].name, value: usrs[i].name})
      }
    this.results = tmp;
    this.selectedItems = [];

  }
  
  addAttendees() {
   // this._attendeeService.addAttendee(new Attendee(name));
    const tmp = []
    for (let i = 0; i < this.selectedItems.length; i++) {
          tmp.push(new Attendee(this.selectedItems[i]));
        }
    this.mainMeeting.attendees = tmp;
    this.snackBar.open("Successfully added attendees","Dismiss",{
      duration: 2000
    });
    }

  removeAttendee(attendee: Attendee) {
    // this._attendeeService.removeAttendee(name);
    this.mainMeeting.attendees.splice(this.mainMeeting.attendees.indexOf(attendee), 1);
  }

  addAction(name: string) {
    this._actionService.addAction(new Action(name));
  }

}
