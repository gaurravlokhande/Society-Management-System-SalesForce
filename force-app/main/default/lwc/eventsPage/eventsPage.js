import { LightningElement, track, wire } from 'lwc';
import GetEventsData from '@salesforce/apex/SocietyManagementSystem.SearchEvents';

export default class EventsPage extends LightningElement {


    @track EventPageTemplate = true;
    @track registrationtamplate = false;
    @track Registrationrequired = true;
    @track StoreEventData = [];
    @track searchvalue = '';


    connectedCallback() {
        this.Searchandshowevents();
    }

    Searchandshowevents() {
        GetEventsData({ searchinit: this.searchvalue })
            .then((result) => {
                this.StoreEventData = result;
            })
            .catch((error) => {
                this.StoreEventData = error;
            });
    }

    onsearchvaluechange(event) {
        this.searchvalue = event.target.value;
        this.Searchandshowevents();
    }

    handleClickOfRegistrationButton() {
        this.EventPageTemplate = false;
        this.registrationtamplate = true;
    }
}
