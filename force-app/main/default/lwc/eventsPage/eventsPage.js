import { LightningElement, track, api } from 'lwc';
import GetEventsData from '@salesforce/apex/SocietyManagementSystem.SearchEvents';

export default class EventsPage extends LightningElement {

   
    @track EventPageTemplate = true;
    @track registrationtamplate = false;
    @track StoreEventData = [];
    @track searchvalue = '';


    connectedCallback() {
        this.Searchandshowevents();
    }

  

    Searchandshowevents() {
        GetEventsData({ searchinit: this.searchvalue })
            .then((result) => {

                let arr = JSON.parse(JSON.stringify(result));
                arr.forEach((item) => {
                      console.log(item.Eligibility__c);
                    if (item.Eligibility__c == 'Registration Required') {
                        item["Registrationrequired"] = true;
                    } else {
                         item["Registrationrequired"] = false;
                    }
                });

                
                this.StoreEventData = arr;


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
