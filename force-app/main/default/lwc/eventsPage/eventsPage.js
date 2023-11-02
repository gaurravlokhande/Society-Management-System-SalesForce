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


    // connectedCallback() {
    //     this.Searchandshowevents();
    // }

    @track modalscreen = true;

    eventid;

    handlePassId(event) {
        this.eventid = event.detail;
        this.Searchandshowevents();
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

    @track isChecked = false;
    errorMessage = 'Please agree to the terms and conditions';
    errorClass = 'slds-hide';
    
    
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
       // alert('Please check the checkbox');
       }
     }

     handleNoofUserRegistration() {
         this.registrationtamplate = false;
         this.CheckboxValue = false;
     }

   

   
   

}
