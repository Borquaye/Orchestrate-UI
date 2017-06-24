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
  actionsItems: FirebaseListObservable < any[] >;
  attendees: FirebaseListObservable < Attendee[] >;

  constructor(
        private _attendeeService: AttendeeService,
        private _actionService: ActionService,
        private _meetingService: MeetingService
  ) {
    this.attendees = _attendeeService.attendees;
    this.actionsItems = _actionService.actionItems;
    this.meeting = this._meetingService.meeting;
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
