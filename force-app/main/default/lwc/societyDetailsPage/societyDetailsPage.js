import { LightningElement, track } from 'lwc';
import getinfoofsociety from '@salesforce/apex/SocietyManagementSystem.getinfoofsociety';
import showallsocietymembers from '@salesforce/apex/SocietyManagementSystem.showallsocietymembers';
import showallsocietystaff from '@salesforce/apex/SocietyManagementSystem.showallsocietystaff';
import showsocietyamenity from '@salesforce/apex/SocietyManagementSystem.showsocietyamenity';
import { NavigationMixin } from 'lightning/navigation';
export default class SocietyDetailsPage extends NavigationMixin(LightningElement) {

    connectedCallback() {
        this.getdetailsofsociety();
    }


    @track Storedata = [];

    getdetailsofsociety() {
        getinfoofsociety()
            .then((result) => {
            console.log(result)
            this.Storedata = result;
        }).catch((error) => {
            alert(error.body.message)
        });
    }



    @track storeallsocietymembers = [];

    @track showallsocietymembers = false;


    handleClickshowallfamilymembers() {
        this.showallsocietymembers = true;
        showallsocietymembers()
            .then((result) => {
                console.log(result)
            this.storeallsocietymembers = result; 
        }).catch((error) => {
            alert(error.body.message)
        });
    }

    handleClickshowallfamily() {
         this.showallsocietymembers = false;
    }


   onclicknameofsocmem(event) {
    const recordId = event.currentTarget.dataset.recordid;

    this[NavigationMixin.Navigate]({
        type: "standard__recordPage",
        attributes: {
            actionName: "view",
            recordId: recordId,  
        }
    });
}

    
    onclicknameofsocstaff(event) {
        const recordId = event.currentTarget.dataset.recordid;

        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
                actionName: "view",
                recordId: recordId,
            }
        });
    }
  





    @track storestaffdata = [];

    @track showallsocietystaff = false;
    
    handleClickofshowallsocietystaff() {
            this.showallsocietystaff = true;
        showallsocietystaff()
            .then((result) => {     
            this.storestaffdata = result;
        }).catch((error) => {
            alert(error.body.message)
        });
    }


    handleClickshowallstaff() {
        this.showallsocietystaff = false;
    }



    @track showsocietyAminitysTemplate = false;



    ondoubleclicksocietyaminity() {
         this.showsocietyAminitysTemplate = false;
    }


    @track storesocietyaminity = [];

    handleseesocietyaminity() {
        this.showsocietyAminitysTemplate = true;

        showsocietyamenity()
        .then((result) => {
            this.storesocietyaminity = result;
        }).catch((error) => {
            
        });
    }



}