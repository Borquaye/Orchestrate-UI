import { Injectable } from '@angular/core';
import { Agenda } from 'app/agendas/agenda.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http/http';

@Injectable()
export class AgendaService {
    private dataStore: {
      agendas: Agenda[],
      currentAgenda: Agenda
  };

  private _agendas: BehaviorSubject<Agenda[]>;
  public agendas: Observable<Agenda[]>;

  private _currentAgenda: BehaviorSubject<Agenda>;
  public currentAgenda: Observable<Agenda>;


  constructor(private _http: Http) {
    this.dataStore = {
      agendas: [
        { id: 1, name: 'Recording transcripts'},
        { id: 2, name: 'Follow-up meetings'},
        { id: 3, name: 'Random stuff'}
      ],
      currentAgenda: null
    }

    this._agendas =  <BehaviorSubject<Agenda[]>>new BehaviorSubject([]);
    this.agendas = this._agendas.asObservable();

    this._currentAgenda =  <BehaviorSubject<Agenda>>new BehaviorSubject({});
    this.currentAgenda = this._currentAgenda.asObservable();
  }

  getAgendas() {
    // this._http.get(backendUrl, options)
    //   .subscribe(result => {
    //     this.dataStore.attendees = result;
    //     this._attendees.next(Object.assign({}, this.dataStore).attendees);
    //   })
  }

  addAgenda(agenda: Agenda) {
    this.dataStore.agendas.push(agenda)
    this._agendas.next(Object.assign({}, this.dataStore).agendas);
  }

  getAgenda(id: number) {
    this.dataStore.currentAgenda = this.dataStore.agendas.find(agenda => agenda.id === id);
    this._currentAgenda.next(Object.assign({}, this.dataStore).currentAgenda);
  }

  editAgenda(agenda: Agenda) {
    this.dataStore.agendas.splice(agenda.id, 1, agenda)
    this._agendas.next(Object.assign({}, this.dataStore).agendas);
  }

  removeAgenda(id: number) {
    this.dataStore.agendas.splice(id, 1)
    this._agendas.next(Object.assign({}, this.dataStore).agendas);
  }

}
