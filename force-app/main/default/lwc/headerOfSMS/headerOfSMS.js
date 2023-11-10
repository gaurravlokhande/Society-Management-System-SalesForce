import { LightningElement, track } from 'lwc';
import SocietyMSLogo from '@salesforce/resourceUrl/SocietyMS';


export default class HeaderOfSMS extends LightningElement {

    @track Societylogo = SocietyMSLogo;
    
    @track EventPage;
    @track ProfilePage;


    HandleProfile() {
        this.ProfilePage = true;
        this.EventPage = false;
    }

    HandleEvent() {
        this.EventPage = true;
        this.ProfilePage = false;
    }

    HandleUtility() {
        
    }
}