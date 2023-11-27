import { LightningElement, track } from 'lwc';
import getinfoofsociety from '@salesforce/apex/SocietyManagementSystem.getinfoofsociety';
import showallsocietymembers from '@salesforce/apex/SocietyManagementSystem.showallsocietymembers';
import showallsocietystaff from '@salesforce/apex/SocietyManagementSystem.showallsocietystaff';

export default class SocietyDetailsPage extends LightningElement {

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



}