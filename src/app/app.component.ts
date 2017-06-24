import { Component, OnInit } from '@angular/core';
import { SignalR, BroadcastEventListener } from "ng2-signalr";

@Component({
  selector: 'orc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'orc';

  constructor(private _signalR: SignalR) { 

  }

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

}
