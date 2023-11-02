import { LightningElement, api, track } from 'lwc';

export default class SelectSocietyNameModalScreen extends LightningElement {
    @api eventid;
    @track eventspage = false;
    @track modalscreenforevents = true;

    onclickofsave() {
        let inputField = this.template.querySelector('[data-id="society"]');
        this.eventid = inputField.value; // Get the value of the input field

        this.dispatchEvent(new CustomEvent('passid', { detail: this.eventid }));
        this.modalscreenforevents = false;

    }
}
