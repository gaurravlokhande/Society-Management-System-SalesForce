import { LightningElement, track } from 'lwc';
import getutilitybill from '@salesforce/apex/SocietyManagementSystem.getutilitybill';
import MarkasPaid from '@salesforce/apex/SocietyManagementSystem.MarkasPaid';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class UtilityPage extends LightningElement {

    connectedCallback() {
        this.fetchutilitybill();
    }

    @track utilitybillsTemplate = true;


    @track Storebilldata = [];

    @track name;
    @track accname;
    @track status;
    @track utilityprovider;
    @track amount;

    
    fetchutilitybill() {
        getutilitybill()
        .then((result) => {
            this.Storebilldata = result.forEach(bill => {
                this.name = bill.Name;
                this.accname = bill.Account__r.Name;
                this.status = bill.Status__c;
                this.utilityprovider = bill.Utility_Provider__r.Name;
                this.amount = bill.Amount__c;
                 this.refreshData();
            });   
           // console.log(result);
        }).catch((error) => {
             console.log(error)
        });
    }
   


    onclickofmarkaspaid() {
        MarkasPaid()
            .then((result) => {
                this.fetchutilitybill();
            this.dispatchEvent(new ShowToastEvent({
                message: result,
                variant: "success"
            }));
        }).catch((error) => {
            this.dispatchEvent(new ShowToastEvent({
                message: error.body.message,
                variant: "error"
            }));
        });
    }
    

    refreshData() {
    return refreshApex(this.Storebilldata);
    }
    
}