import { ACTION_STATUS } from 'app/shared/action-status.enum';

export class Action {
    name: string;
    assignee: string;
    description: string;
    status: ACTION_STATUS;
    deadline?: number;

    constructor(_name: string) {
        this.name = _name;
    }
}
