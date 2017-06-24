import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetingComponent } from './meeting/meeting.component';

import { SignalRModule, SignalRConfiguration } from 'ng2-signalr';
import 'signalr/jquery.signalR.js';

// v2.0.0
export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'SignalrHub';
  c.url = 'http://localhost:8080';
  c.logging = true;
  return c;
}

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'environments/environment';
import { HttpModule } from '@angular/http';

import { AgendaService } from 'app/agendas/agenda.service';
import { AttendeeService } from 'app/attendees/attendee.service';
import { InputTextModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import {ActionService} from "app/actions/action.service";


@NgModule({
  declarations: [
    AppComponent,
    MeetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignalRModule.forRoot(createConfig),
    HttpModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [
    AgendaService,
    AttendeeService,
    ActionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
