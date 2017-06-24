import { ACTION_STATUS } from 'app/shared/action-status.enum';

export class Action {
    name: string;
    assignee: string;
    status: ACTION_STATUS;
    deadline?: Date;
}
