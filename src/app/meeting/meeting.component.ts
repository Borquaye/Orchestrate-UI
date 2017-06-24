import { Component, OnInit } from '@angular/core';
import {AttendeeService} from "app/attendees/attendee.service";
import {FirebaseListObservable} from "angularfire2/database";
import {Attendee} from "app/attendees/attendee.model";
import {ActionService} from "app/actions/action.service";
import {Action} from "app/actions/action.model";

@Component({
  selector: 'orc-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  actionsItems : FirebaseListObservable < any[] >;
  attendees : FirebaseListObservable < Attendee[] >;

  constructor(
        private _attendeeService: AttendeeService,
        private _actionService: ActionService,
        
  ) { 
    this.attendees = _attendeeService.attendees;
    this.actionsItems = _actionService.actionItems;
    
  }

  ngOnInit() {
  }

  addAttendee(name: string) {
    this._attendeeService.addAttendee(new Attendee(name));
  }

  addAction(name: string) {
    this._actionService.addAction(new Action(name));
  }

}
