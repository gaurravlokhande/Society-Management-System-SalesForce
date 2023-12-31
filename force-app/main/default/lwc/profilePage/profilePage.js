import { LightningElement, track, wire } from 'lwc';
import UserAccountRelatedContacts from '@salesforce/apex/SocietyManagementSystem.UserAccountRelatedContacts';
import getalluserDetails from '@salesforce/apex/SocietyManagementSystem.getalluserDetails';
import addFamilyMembers from '@salesforce/apex/SocietyManagementSystem.addFamilyMembers';
import deletecontact from '@salesforce/apex/SocietyManagementSystem.deleteContact';
import getvisitorlist from '@salesforce/apex/SocietyManagementSystem.getvisitorlist';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



const actions = [
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
    { label: 'View', name: 'view' },
];

const columns = [
    { label: 'First Name', fieldName: 'FirstName', type: 'text' },
    { label: 'Last Name', fieldName: 'LastName', type: 'text' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
     { label: 'Status', fieldName: 'Status__c' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];


const visitors = [
    { label: 'Name', fieldName: 'NAme'},
    { label: 'Flat', fieldName: 'Flatstore'},
    { label: 'Date Time', fieldName: 'Datetime' },
     { label: 'Address', fieldName: 'Address' },
];


export default class ProfilePage extends NavigationMixin(LightningElement) {
    
    visitors = visitors;


    connectedCallback() {
        this.getalluserdetails();
    }

  @track StoreAllDetailOfUser = [];

    @track ShowfaltNo;
    @track ShowAccname;
    @track ShowEmail;
    @track ShowPhone;
    @track ShowSociety;
    @track ShowFlatemember;
    @track ShowFlattype;
    @track profilepic;

    getalluserdetails() {
        getalluserDetails()
        .then((result) => {
            this.StoreAllDetailOfUser = result.forEach(acc => {
                this.profilepic = acc.ProfilePicture__c;
                this.ShowfaltNo = acc.Flat_NO__c;
                this.ShowAccname = acc.Name;
                this.ShowEmail = acc.Email__c;
                this.ShowPhone = acc.Phone;
                this.ShowSociety = acc.Society__r.Name;
                this.ShowFlattype = acc.Flat_Type__c;
                this.ShowFlatemember = acc.Total_Flat_Members__c;

            });

        }).catch((error) => {
            alert(error);
        });
    }






    @track contacts = [];
    columns = columns;


    @wire(UserAccountRelatedContacts)
    wiredContacts(result){
        this.wireResult = result;
        if (result.data) {
            console.log(result.data);
            this.contacts = result.data;
        }else if(result.error){
            this.error = result.error;
        }
    }

    

    handleRowAction(event) {
        const action = event.detail.action.name;
        const ContactId = event.detail.row.Id;

        switch (action) {
            case 'edit':    
                this[NavigationMixin.Navigate]({
                    type: "standard__recordPage",
                    attributes: {
                        actionName: "edit",
                        recordId: ContactId,
                    }
                });
                break;
            case 'delete':
                // Handle the delete action
                deletecontact({ contactId: ContactId })
                    .then((result) => {
                        if (result==='You canot Delete yourself, try to contact Admin') {
                            this.dispatchEvent(new ShowToastEvent({   
                                message: "You canot Delete yourself, try to contact Admin",
                                variant: "warning"
                            }));
                        } else {
                        this.dispatchEvent(new ShowToastEvent({
                        message: result,
                        variant: "success"
                        }));
                        return refreshApex(this.wireResult);
                        }
                   
                    }).catch((error) => {
                        
                    this.dispatchEvent(new ShowToastEvent({
                        message: error.body.message,
                        variant: "error"
                    }));
                    });
                
                break;
            case 'view':
                 this[NavigationMixin.Navigate]({
                    type: "standard__recordPage",
                    attributes: {
                        actionName: "view",
                        recordId: ContactId,
                    }
                });
                break;
            default:
                break;
        }
    }



    @track trueaddfamilymember = false;

    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track phone = '';
 

    handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handlePhoneChange(event) {
        this.phone = event.target.value;
    }


    handleClickofAddFamilyMember() {
        this.trueaddfamilymember = true;
    }

    handlesavebutton() {
        addFamilyMembers({ 
            firstName: this.firstName, 
            lastName: this.lastName, 
            email: this.email, 
            phone: this.phone 
        })
        .then(result => {
            this.dispatchEvent(new ShowToastEvent({
                message: "Family Member Added Successfully",
                variant: "success"
            }));
            this.trueaddfamilymember = false;
            this.emptyallnamefields();
          return refreshApex(this.wireResult);
        })
        .catch(error => {
          this.dispatchEvent(new ShowToastEvent({
              message: "Error While Add Family Member",
              variant: "warning"
          }));
        });
    }


    handleClickofcancel(){
        this.emptyallnamefields();
        this.trueaddfamilymember = false;
    }




    emptyallnamefields() {
        this.firstName = null;
        this.lastName = null;
        this.phone = null;
        this.email = null;
    }



    onclickofsocietyname() {
          this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
               url: "https://gauravlokhande-dev-ed.develop.my.site.com/sms/s/societyallmembers"
            }
        });
    }



    @track Showallflatvisitors = false;

    @track Storeallvisitors = [];

    handleClickofVisitorsbutton() {
        this.Showallflatvisitors = true;
        getvisitorlist()
        .then((result) => {
            this.Storeallvisitors = result.map(item => ({
                NAme: item.Name,
                Datetime: item.Date_Time__c,
                Address: item.Address__c,
                Flatstore: item.Flat__r.Name,
       }));
       }).catch((err) => {
   
     });

    }



    handledblClickofVisitorsbutton() {
          this.Showallflatvisitors = false;
    }

    onclickofcloseicon() {
          this.Showallflatvisitors = false;
    }

}











