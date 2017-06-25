import { Action } from 'app/actions/action.model';

export class Agenda {
    id: number;
    name: string;
    actions: Action[];

    constructor(_name: string) {
        this.name = _name;
        this.actions = [];
    }
}
