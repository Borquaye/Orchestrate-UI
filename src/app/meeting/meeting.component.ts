import { Component, OnInit } from '@angular/core';
import { MeetingService } from 'app/meeting/meeting.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'orc-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent {
  meeting: FirebaseObjectObservable<any>;

  constructor(private _meetingService: MeetingService) {
    this.meeting = this._meetingService.meeting;
    debugger;
  }


}
