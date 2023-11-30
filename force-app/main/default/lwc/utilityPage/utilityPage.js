import { LightningElement, track } from 'lwc';
import getutilitybill from '@salesforce/apex/SocietyManagementSystem.getutilitybill';
import markaspaid from '@salesforce/apex/SocietyManagementSystem.changeUtilityStatus';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


const columns = [
    { label: 'Invoice No', fieldName: 'Name', initialWidth: 100 },
    { label: 'Amount', fieldName: 'Amount__c', initialWidth: 100},
    { label: 'Status', fieldName: 'Status__c' , initialWidth: 100},
    { label: 'Account Name', fieldName: 'Accountname', initialWidth: 150 },
    { label: 'Utility Provider Name', fieldName: 'UtilityProviderName', initialWidth: 150 },
    { label: 'Created DateTime', fieldName: 'Created_Date__c', initialWidth: 200 },
    { label: 'Due DateTime', fieldName: 'Due_Date__c' , initialWidth: 200},
    {
        type: "button", initialWidth: 160, typeAttributes: {
           //label: 'Mark As paid',
            disabled: {fieldName:'markaspaid'},
            value: 'view',
            iconPosition: 'left',
            iconName:'action:approval' ,
            variant:'Brand'
        }
    }
];



export default class UtilityPage extends LightningElement {
    columns = columns;
    
    connectedCallback() {
        this.fetchUtilityBill();
    }


    @track Storebilldata = [];


    
  fetchUtilityBill() {
    getutilitybill()
        .then(result => {
            // console.log(result);
            
            this.Storebilldata = result.map(item => ({
                ...item,
                Accountname: item.Flat__r.Name,
                UtilityProviderName: item.Utility_Provider__r.Name,
                markaspaid:item.Status__c==='Paid' 
            }));

        })
        .catch(error => {
            console.error("Error fetching utility bill:", error);
        });
}


    @track rowid;
    @track action;
    
    callRowAction(event) {
     const action = event.detail.action.iconName;
     this.rowid = event.detail.row.Id;
    console.log(this.rowid)
        
    switch (action) {
        case 'action:approval':
            markaspaid({ rowId: this.rowid })
                .then((result) => {
                if (result==='Bill paid Successfully') {
                     this.fetchUtilityBill();
                this.dispatchEvent(new ShowToastEvent({
                    message: result,
                    variant: "success"
                }));
                } else {
                    this.dispatchEvent(new ShowToastEvent({
                        title: "title",
                        message: "Bill Already Paid",
                        variant: "error"
                    }));
                }      
               
            }).catch((error) => {
                this.dispatchEvent(new ShowToastEvent({
                    message:error.body.message ,
                    variant: "error"
                }));
            });
            break;
    
        default:   
           alert('method not working')
            break;
     }
    }

   
    
}