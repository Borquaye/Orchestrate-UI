import { Attendee } from 'app/attendees/attendee.model';
import { Agenda } from 'app/agendas/agenda.model';

export class Meeting {
    title: string;
    attendees: Attendee[];
    agendaItems: Agenda[];
    reviewer: string;

    constructor(_title: string, _attendees: Attendee[], _agendaItems: Agenda[], _reviewer: string ) {
        this.title = _title;
        this.attendees = _attendees;
        this.agendaItems = _agendaItems;
        this.reviewer = _reviewer;
    }

}
