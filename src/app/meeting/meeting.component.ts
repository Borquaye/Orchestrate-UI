import { Component, OnInit } from '@angular/core';
import { MeetingService } from 'app/meeting/meeting.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { SignalR, BroadcastEventListener } from 'ng2-signalr';
import {AttendeeService} from 'app/attendees/attendee.service';
import {Attendee} from 'app/attendees/attendee.model';
import {ActionService} from 'app/actions/action.service';
import {MdSnackBar} from '@angular/material';
import { Action } from 'app/actions/action.model';
import { SelectItem } from 'primeng/primeng';
import { Meeting } from 'app/meeting/meeting.model';
import { Agenda } from 'app/agendas/agenda.model';
import { INTENTS } from 'app/shared/intents.enum';

@Component({
  selector: 'orc-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})

export class MeetingComponent implements OnInit {
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
  usrs: any[];
  currentAction: any;

  constructor(
        private _attendeeService: AttendeeService,
        private _actionService: ActionService,
        private _meetingService: MeetingService,
        private _signalR: SignalR,
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
    this.usrs = [
      new Attendee('Kiran', 'KR'),
      new Attendee('Adeeb', 'AH'),
      new Attendee('Amaris', 'AP'),
      new Attendee('Joe', 'JP'),
      new Attendee('Sam', 'SH'),
      new Attendee('Mike', 'MK')
    ];

    // const ats = [new Attendee('Kiran', 'KR'), new Attendee('Adeeb', 'AH'), new Attendee('Amari', 'AP')];
    const ag1 = new Agenda('Discuss The Problem');
    const ag2 = new Agenda('The Solution');
    const ac = new Action('Capture meeting audio');
    ac.assignee = 'Kiran';
    ag1.actions.push(ac);
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
    for (let i = 0; i < this.usrs.length; i++) {
        tmp.push({ label: this.usrs[i].name, value: this.usrs[i].name, initials: this.usrs[i].initials})
      }
    this.results = tmp;
    this.selectedItems = [];

    console.log(this.theAgenda);
  }

  addAttendees() {
   // this._attendeeService.addAttendee(new Attendee(name));
   const tmp = []
   for (let i = 0; i < this.selectedItems.length; i++) {
        tmp.push(new Attendee(this.selectedItems[i], this.usrs.find(user => user.name === this.selectedItems[i]).initials));
      }

    this.mainMeeting.attendees = tmp;
    this.snackBar.open('Successfully added attendees', 'Dismiss', {
      duration: 5000
    });
  }

  removeAttendee(attendee: Attendee) {
    // this._attendeeService.removeAttendee(name);
    this.mainMeeting.attendees.splice(this.mainMeeting.attendees.indexOf(attendee), 1);
  }

  addAction(name: string) {
    this._actionService.addAction(new Action(name));
  }

    ngOnInit() {
    this._signalR.connect().then((c) => {

      const onMessageSent = new BroadcastEventListener<any>('SpeechRecognised');
      c.listen(onMessageSent)
      onMessageSent.subscribe((msg: any) => {

        const intent = msg.intent;
        const entities = msg.entities;

        console.log('intent: ' + intent);
        if (entities.length > 0) {
          console.log('first entity: ' + entities[0].entity + ' confidence:' + entities[0].score);
        }

        this.processIntent(intent, entities);
      });

    });
  }

  processIntent(intent: any, entities: any[]) {
    switch (intent) {
      case INTENTS.PREVIOUS_AGENDA: {
        break;
      }
      case INTENTS.NEXT_AGENDA: {
        break;
      }
      case INTENTS.ADD_TASK: {
        if (entities.length > 0) {
          // toast message
        } else {
          const action = new Action(entities[0]);
          this.theAgenda.actions.push(action)
          this.currentAction = action;
        }
        break;
      }
      case INTENTS.ASSIGN_USER_TO_TASK: {
        if (entities.length > 0) {
          // toast message
        } else {
          this.currentAction.assignee = this.usrs.find(user => user.name === entities[0]).initials;
        }
        break;
      }
      case INTENTS.NONE: {
        break;
      }
    }
  }

}
