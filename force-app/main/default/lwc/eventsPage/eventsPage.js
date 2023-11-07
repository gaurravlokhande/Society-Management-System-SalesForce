import { LightningElement, track,wire } from 'lwc';
import CheckCurrentUserSociety from '@salesforce/apex/SocietyManagementSystem.isCurrentUserSocietyEmpty';
import SearchEventsForAlreadyRagstered from '@salesforce/apex/SocietyManagementSystem.SearchEventsForAlreadyRagstered';
import UpdateSocietyOnAccount from '@salesforce/apex/SocietyManagementSystem.UpdateAccountSociety';
import registerForEvent from '@salesforce/apex/SocietyManagementSystem.registerForEvent';
export default class EventsPage extends LightningElement {

    @track EventSPageTemplate = false;
    @track ShowSocietySelectToNotRagisteredUser = false;





   
    connectedCallback() {
        this.CheckCurrentUserSocietyField();
    }


    @track SocietyExistContact;



    CheckCurrentUserSocietyField() {
    CheckCurrentUserSociety()
        .then((result) => {
        this.SocietyExistContact = result;
        console.log(this.SocietyExistContact);
        this.SocietyAlreadyexist();
        this.ShowSocietySelectToNotRagisteredUser = false;
        this.EventSPageTemplate = true;
            
    }).catch((error) => {
        console.log(error.body.message);
        this.ShowSocietySelectToNotRagisteredUser = true;
     
    });
    }
   

    
    handleClickOfSave() {
        let inputField = this.template.querySelector('[data-id="society"]');
        this.SocietyExistContact = inputField.value; 
        this.SocietyAlreadyexist();
        this.UpdateSocietyOnContact();
        this.ShowSocietySelectToNotRagisteredUser = false;
        this.EventSPageTemplate = true;
    }





    @track StoreEventData = [];

    SocietyAlreadyexist() {
        SearchEventsForAlreadyRagstered({ AlreadyRagistered:this.SocietyExistContact })
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
        }).catch((error) => {
            
        });
    }


    UpdateSocietyOnContact() {
     UpdateSocietyOnAccount({ SocietyId: this.SocietyExistContact })
    .then((result) => {
        
    }).catch((err) => {
        
    });
    }
   

    // -------------------------Current User Registration------------------------------------------
    @track Storeeventid;
    @track CurrentUserRegistrationTemplate = false;




     handleClickOfRegistrationButton(event) {
       this.registrationtamplate = true;
       this.Storeeventid = event.target.dataset.recordid;
    }

    
    handleYESfUserRegistration() {
        console.log('eventid'+this.Storeeventid);
      if (this.CheckboxValue===true) {
        registerForEvent({ eventId: this.Storeeventid })
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

     oncheckboxchange(event) {
    this.CheckboxValue = event.target.checked;
     }

     handleNoofUserRegistration() {
         this.registrationtamplate = false;
         this.CheckboxValue = false;
     }






}
