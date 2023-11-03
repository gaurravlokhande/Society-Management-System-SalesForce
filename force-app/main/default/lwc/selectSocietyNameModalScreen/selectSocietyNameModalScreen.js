import { LightningElement, api, track } from 'lwc';

export default class SelectSocietyNameModalScreen extends LightningElement {
    
    @track eventspage = false;
    @track modalscreenforevents = true;

    @api eventid;
    
    onclickofsave() {
        let inputField = this.template.querySelector('[data-id="society"]');
        this.eventid = inputField.value;    

        this.dispatchEvent(new CustomEvent('passid', { detail: this.eventid }));
         this.modalscreenforevents = false;   
     

    }
}
