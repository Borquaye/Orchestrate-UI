export class Attendee {
    id: string;
    name: string;
    initials: string;

    constructor(_name: string, _initials: string) {
        this.name = _name;
        this.initials = _initials;
    }
}
