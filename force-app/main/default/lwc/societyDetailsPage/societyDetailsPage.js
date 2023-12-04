import { LightningElement, track } from 'lwc';
import getinfoofsociety from '@salesforce/apex/SocietyManagementSystem.getinfoofsociety';
import showallsocietymembers from '@salesforce/apex/SocietyManagementSystem.showallsocietymembers';
import showallsocietystaff from '@salesforce/apex/SocietyManagementSystem.showallsocietystaff';
import showsocietyamenity from '@salesforce/apex/SocietyManagementSystem.showsocietyamenity';
import { NavigationMixin } from 'lightning/navigation';


const columns = [
    { label: 'Flat No', fieldName: 'Flat_No__c' },
    { label: 'Name', fieldName: 'Name' },
    { label: 'Email', fieldName: 'Email__c' },
    { label: 'Phone', fieldName: 'Phone'},
    
];



const columnstwo = [
   
    { label: 'Name', fieldName: 'namestaff' },
    { label: 'Email', fieldName: 'emailstaff' },
    { label: 'Phone', fieldName: 'Phonestaff' },
    { label: 'Staff Role', fieldName: 'staffrole' },
    { label: 'Society', fieldName: 'societyname' },

    	
];



export default class SocietyDetailsPage extends NavigationMixin(LightningElement) {

    columns = columns;

    columnstwo = columnstwo;

    connectedCallback() {
        this.getdetailsofsociety();
    }


    @track Storedata = [];

    getdetailsofsociety() {
        getinfoofsociety()
            .then((result) => {
            //console.log(result)
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
                //console.log(result)
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
              this.storestaffdata = result.map(item => ({
                  societyname: item.Society__r.Name,
                  Phonestaff: item.Phone__c,
                  emailstaff: item.Email__c,
                  namestaff: item.Name,
                  staffrole:item.Staff_Role__c,
            }));

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