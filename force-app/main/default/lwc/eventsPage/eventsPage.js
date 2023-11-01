import { LightningElement, track } from 'lwc';
import GetEventsData from '@salesforce/apex/SocietyManagementSystem.SearchEvents';
import ragistrationforevents from '@salesforce/apex/SocietyManagementSystem.registerForEvent';
//import Id from '@salesforce/user/Id';
//import isGuest from '@salesforce/user/isGuest';

export default class EventsPage extends LightningElement {


    @track Storeeventid;

    @track Showeventstemplate = true;
    @track registerfamilymembers = false;
    @track registrationtamplate = false;

    @track StoreEventData = [];
    @track searchvalue = '';
    @track CheckboxValue;


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



    handleClickOfRegistrationButton(event) {
        this.registrationtamplate = true;
       this.Storeeventid = event.target.dataset.recordid;
    }

    handleClickRegisterFamilyMembers() {
        this.registerfamilymembers = true;
        this.Showeventstemplate = false;
    }
    


    oncheckboxchange(event) {
    this.CheckboxValue = event.target.checked;
     }

    handleYESfUserRegistration() {
        console.log('eventid'+this.Storeeventid);
      if (this.CheckboxValue===true) {
        ragistrationforevents({ eventId: this.Storeeventid })
            .then(response => {
                this.registrationtamplate = false;
            })
            .catch(error => {
                console.error('Error:', error.body.message);
            });
       } else {
        alert('Please check the checkbox');
       }
     }

     handleNoofUserRegistration() {
         this.registrationtamplate = false;
         this.CheckboxValue = false;
     }

   

   
   

}
