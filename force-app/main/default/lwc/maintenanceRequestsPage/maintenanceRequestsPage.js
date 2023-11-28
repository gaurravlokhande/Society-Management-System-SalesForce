import { LightningElement, track } from 'lwc';
import returndatamaintreq from '@salesforce/apex/SocietyManagementSystem.returndatamaintreq';
import addmaintenancerequest from '@salesforce/apex/SocietyManagementSystem.addMaintenanceRequest';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
 const columns = [
         {label: 'Name', fieldName: 'Name'},
         {label: 'Requested Date', fieldName: 'Request_Date__c'},
         {label: 'Description', fieldName: 'Description__c'},
         {label: 'Assigned To', fieldName: 'Assignedto'},
         {label: 'Requested By', fieldName: 'requestedby'},
         {label: 'Society', fieldName: 'societyname'},
         { label: 'Flat', fieldName: 'flatname' },
     ];





export default class MaintenanceRequestsPage extends LightningElement {

    connectedCallback() {
        this.showmaintenreqdata();
    }

    columns = columns;

    @track Storemaintdata=[];



    showmaintenreqdata() {
    returndatamaintreq()
        .then((result) => {
            // console.log(result)
            this.Storemaintdata = result.map(item => ({
          ...item,
                    Assignedto: item.Assigned_to__r ? item.Assigned_to__r.Name : '',
                    requestedby: item.Requested_By__r ? item.Requested_By__r.Name : '',
                    societyname: item.Society__r ? item.Society__r.Name : '',
                    flatname: item.Flat__r ? item.Flat__r.Name : ''
            }));
            console.log(this.Storemaintdata);
    })
    .catch((error) => {
        alert(error.body.message);
    });

    }



    @track addmaintenancerequest = false;
    @track targettextareavalue = '';

    onclicknewmaintanacerequest() {
        this.addmaintenancerequest = true;
    }

    onchangetestareafield(event) {
        this.targettextareavalue = event.target.value;
    }

    handleClickofsubmitmaintreq() {
      
        addmaintenancerequest({ description: this.targettextareavalue })
            .then((result) => {
                this.showmaintenreqdata();
            this.addmaintenancerequest = false;
            this.dispatchEvent(new ShowToastEvent({
                title: "title",
                message: result,
                variant: "success"
            }));
                this.clearallfields();
            }).catch((error) => {
                console.log(error.body.message);
            this.dispatchEvent(new ShowToastEvent({
                title: "title",
                message: error.body.message,
                variant: "error"
            }));
        });
    }


    clearallfields() {
        this.targettextareavalue = false;
    }

}