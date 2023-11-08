import { LightningElement, track,wire } from 'lwc';
import CheckCurrentUserSociety from '@salesforce/apex/SocietyManagementSystem.isCurrentUserSocietyEmpty';
import SearchEventsForAlreadyRagstered from '@salesforce/apex/SocietyManagementSystem.SearchEventsForAlreadyRagstered';
import UpdateSocietyOnAccount from '@salesforce/apex/SocietyManagementSystem.UpdateAccountSociety';
import registerForEvent from '@salesforce/apex/SocietyManagementSystem.checkUserRegister';
export default class EventsPage extends LightningElement {

    @track EventSPageTemplate = false;
    @track ShowSocietySelectToNotRagisteredUser = true;





   
    connectedCallback() {
        this.CheckCurrentUserSocietyField();
    }


    @track SocietyExistContact;



    CheckCurrentUserSocietyField() {
    CheckCurrentUserSociety()
        .then((result) => {
        //this.ShowSocietySelectToNotRagisteredUser = false;
        this.SocietyExistContact = result;
       // console.log(this.SocietyExistContact);
        this.SocietyAlreadyexist();
        
        this.EventSPageTemplate = true;
            
    }).catch((error) => {
        //console.log(error.body.message);
        if (error) {
         this.ShowSocietySelectToNotRagisteredUser = true;
        }
      
    });
    }
   

    @track disableSocietyBtn;

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
        
    }).catch((error) => {
        
    });
    }
   

    // -------------------------Current User Registration------------------------------------------
    @track Storeeventid;
    @track CurrentUserRegistrationTemplate = false;




     handleClickOfRegistrationButton(event) {
       this.CurrentUserRegistrationTemplate = true;
       this.Storeeventid = event.target.dataset.recordid;
      // console.log(this.Storeeventid);
    }

    
    handleYESfUserRegistration() {
       //console.log(this.Storeeventid);
      if (this.CheckboxValue===true) {
        registerForEvent({ EventId: this.Storeeventid })
            .then(response => {
                alert(response);
                this.CurrentUserRegistrationTemplate = false;        
            })
            .catch(error => {
                alert(error.body.message)
                this.CurrentUserRegistrationTemplate= false
            });
       } else {
       alert('Please check the checkbox');
       }
     }

     oncheckboxchange(event) {
    this.CheckboxValue = event.target.checked;
     }

     handleNoofUserRegistration() {
         this.CurrentUserRegistrationTemplate = false;
         this.CheckboxValue = false;
     }






}
