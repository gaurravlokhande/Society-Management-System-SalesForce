import { LightningElement, track } from 'lwc';
import CheckCurrentUserSociety from '@salesforce/apex/SocietyManagementSystem.isCurrentUserSocietyEmpty';
import SearchEventsForAlreadyRagstered from '@salesforce/apex/SocietyManagementSystem.SearchEventsForAlreadyRagstered';
import UpdateSocietyOnAccount from '@salesforce/apex/SocietyManagementSystem.UpdateAccountSociety';
import registerForEvent from '@salesforce/apex/SocietyManagementSystem.RegisterContactForEvents';
import UserAccountRelatedContacts from '@salesforce/apex/SocietyManagementSystem.getUnregisteredContactForEvent';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';


const columns = [
    { label: 'Name', fieldName: 'Name' }
];

export default class EventsPage extends  NavigationMixin(LightningElement) {

    @track EventSPageTemplate = true;
    @track ShowSocietySelectToNotRagisteredUser = false;
    @track CurrentUserRegistrationTemplate = false;


    columns = columns;


   
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
              // console.log(this.SocietyExistContact);
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
    @track storesociety = '';

    @track Registrationrequired = false;
    
    SocietyAlreadyexist() {
        SearchEventsForAlreadyRagstered({ AlreadyRagistered:this.SocietyExistContact })
        .then((result) => {
        
                let arr = JSON.parse(JSON.stringify(result));
            arr.forEach((item) => {
                this.storesociety = item.Society__r.Name;
                    if (item.Eligibility__c == 'Registration Required') {
                       this.Registrationrequired = true;
                    } else {
                         this.Registrationrequired = false;
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
        this.fetchallcontactsdetails();
        this.CurrentUserRegistrationTemplate = true;
         
    }

    
    handleYESfUserRegistration(event) {
         if(this.CheckboxValue == false){      
             this.dispatchEvent(new ShowToastEvent({
                 title: "title",
                 message: "Please check the checkbox",
                 variant: "warning"
             }));
         } else {
             this.registerforeventscon();
         }     
     }
    
    
    registerforeventscon() {
        registerForEvent({ EventId: this.Storeeventid, ContactId: this.Storeidforregisteraion })
             .then((result) => {
                this.dispatchEvent(new ShowToastEvent({
                    title: "title",
                    message: result,
                    variant: "success"
                }));
                 this.CurrentUserRegistrationTemplate = false;
                 this.CheckboxValue = false;
             }).catch((error) => {
                alert(JSON.stringify(error))
             });
    }


    @track CheckboxValue=false;

    oncheckboxchange(event) {
    this.CheckboxValue = event.target.checked;
     }

    handleNoofUserRegistration() {
        this.CheckboxValue = false;
        this.CurrentUserRegistrationTemplate = false;
        
     }

    
   

    // register family members functionality
    @track rowid;
    @track action;
    @track Storealluserdetail = [];



    @track Storeidforregisteraion;

    onselectionlofdatatablerow(event) {   
        var selectedRecords = event.detail.selectedRows;
        for (let i = 0; i < selectedRecords.length; i++) {
            const selectedrecords = selectedRecords[i].Id;  
            this.Storeidforregisteraion = selectedrecords;
        }
       
    }


     fetchallcontactsdetails() {
        UserAccountRelatedContacts({eventId:this.Storeeventid})
            .then((result) => {
           
                 this.Storealluserdetail = result;

           
        }).catch((error) => {
            
        });
     }
    
    
  

    onclickofsociety() {
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
               url: "https://gauravlokhande-dev-ed.develop.my.site.com/sms/s/societyallmembers"
            }
        });
    }


}
