import { LightningElement, track } from 'lwc';
import CheckCurrentUserSociety from '@salesforce/apex/SocietyManagementSystem.isCurrentUserSocietyEmpty';
import SearchEventsForAlreadyRagstered from '@salesforce/apex/SocietyManagementSystem.SearchEventsForAlreadyRagstered';
import UpdateSocietyOnAccount from '@salesforce/apex/SocietyManagementSystem.UpdateAccountSociety';
import checkUserRegistrationForEvent from '@salesforce/apex/SocietyManagementSystem.checkUserRegistrationForEvent';
import registerForEvent from '@salesforce/apex/SocietyManagementSystem.registerForEvent';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



export default class EventsPage extends LightningElement {

    @track EventSPageTemplate = true;
    @track ShowSocietySelectToNotRagisteredUser = false;





   
    connectedCallback() {
        this.CheckCurrentUserSocietyField();
    }


    @track SocietyExistContact;



    CheckCurrentUserSocietyField() {
    CheckCurrentUserSociety()
        .then((result) => {    
            if (result==='False') {
                   this.ShowSocietySelectToNotRagisteredUser = true;
            } else {
                this.SocietyExistContact = result;
               console.log(this.SocietyExistContact);
               this.SocietyAlreadyexist();
            }
        
    }).catch((error) => {
        console.log(error.body.message);
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
         this.Storeeventid = event.target.dataset.recordid;
         console.log(this.Storeeventid)
           checkUserRegistrationForEvent({eventId:this.Storeeventid})
            .then((result)=>{
                if(result=='Already Registered'){
                    this.dispatchEvent(new ShowToastEvent({
                        title: "Already Registered",
                        variant: "warning"
                    }));
                }else{
                this.CurrentUserRegistrationTemplate = true;
                }
            })
         
         
    }

    
     handleYESfUserRegistration() {
                if(this.CheckboxValue === false){
               
                    this.dispatchEvent(new ShowToastEvent({
                        message: "Please Select The Checkbox",
                        variant: "warning"
                    }));
                } else{
                    registerForEvent({eventId: this.Storeeventid })
                    .then(result => {
                        //alert(result)
                        this.dispatchEvent(new ShowToastEvent({
                            message: result ,
                            variant: "success"
                        }));
                        this.CurrentUserRegistrationTemplate = false;
                    })
                        .catch(error => {
                        this.dispatchEvent(new ShowToastEvent({
                            message: error.body.message,
                            variant: "error"
                        }));
                       // console.error('Error registering for the event:', error.body.message);
                    });
                }     
     }
    
    
    oncheckboxchange(event) {
    this.CheckboxValue = event.target.checked;
     }

    handleNoofUserRegistration() {
        this.CheckboxValue = false;
        this.CurrentUserRegistrationTemplate = false;
        
     }



}
