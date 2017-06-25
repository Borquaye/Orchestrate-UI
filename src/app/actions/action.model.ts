import { ACTION_STATUS } from 'app/shared/action-status.enum';
import { Attendee } from 'app/attendees/attendee.model';

export class Action {
    name: string;
    assignee: Attendee;
    description: string;
    status: ACTION_STATUS;
    deadline?: number;

    constructor(_name: string) {
        this.name = _name;
    }
}
