import { LightningElement, track, wire } from 'lwc';
import dasra from '@salesforce/resourceUrl/dsra';
import GetEventsData from '@salesforce/apex/SocietyManagementSystem.SearchEvents';

export default class EventsPage extends LightningElement {

    @track dasra = dasra;


    connectedCallback() {
        this.Searchandshowevents();
    }
   

    @track StoreEventData =[];

    @track searchvalue = '';


    Searchandshowevents() {
        GetEventsData({ searchinit: this.searchvalue })
        .then((result) => {
            this.StoreEventData = result;
            
        }).catch((error) => {
            this.StoreEventData = error;
        });
    
    }
   
    onsearchvaluechange(event) {
        this.searchvalue = event.target.value;
        this.Searchandshowevents();
    }
    
  
    
}