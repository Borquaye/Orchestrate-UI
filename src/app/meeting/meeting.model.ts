import { Attendee } from 'app/attendees/attendee.model';
import { Agenda } from 'app/agendas/agenda.model';

export class Meeting {
    title: string;
    attendees: Attendee[];
    agendaItems: Agenda[];

    constructor() {}

}
