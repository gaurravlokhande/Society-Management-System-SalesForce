import { LightningElement, track } from 'lwc';
import GetEventsData from '@salesforce/apex/SocietyManagementSystem.SearchEvents';
import ragistrationforevents from '@salesforce/apex/SocietyManagementSystem.registerForEvent';

export default class EventsPage extends LightningElement {

    

    @track Showeventstemplate = true;
    @track registerfamilymembers = false;
    @track registrationtamplate = false;
    @track modalscreen = true;
    

    @track StoreEventData = [];
    @track CheckboxValue;
    @track Storeeventid;

   

    eventid;

    handlePassId(event) {
        this.eventid = event.detail;
        this.Searchandshowevents();
        this.modalscreen = false;
    }

    Searchandshowevents() {
        GetEventsData({ eventid: this.eventid })
            .then((result) => {
                let arr = JSON.parse(JSON.stringify(result));
                arr.forEach((item) => {
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

   

     handleClickOfRegistrationButton(event) {
       this.registrationtamplate = true;
       this.Storeeventid = event.target.dataset.recordid;
    }

    
    handleYESfUserRegistration() {
        console.log('eventid'+this.Storeeventid);
      if (this.CheckboxValue===true) {
        ragistrationforevents({ eventId: this.Storeeventid })
            .then(response => {
                this.registrationtamplate = false;        
            })
            .catch(error => {
              this.dispatchEvent(new ShowToastEvent({
                  message: "Not Registered",
                  variant: "error"
              }));
            });
       } else {
       alert('Please check the checkbox');
       }
     }

    handleClickRegisterFamilyMembers() {
        this.registerfamilymembers = true;
        this.Showeventstemplate = false;
    }

     oncheckboxchange(event) {
    this.CheckboxValue = event.target.checked;
     }

     handleNoofUserRegistration() {
         this.registrationtamplate = false;
         this.CheckboxValue = false;
     }

   

   
   

}
