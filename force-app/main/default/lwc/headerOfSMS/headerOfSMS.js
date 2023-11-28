import { LightningElement, track } from 'lwc';
import SocietyMSLogo from '@salesforce/resourceUrl/SocietyMS';
import { NavigationMixin } from 'lightning/navigation';
//import Devicetype from '@salesforce/client/formFactor';


export default class HeaderOfSMS extends NavigationMixin(LightningElement)  {

    // @track largedevice = false;
    // @track smalldevice = false;

    // connectedCallback() {
    //     this.determineDeviceType();
    // }


    // determineDeviceType() {
    //     if (Devicetype ==='Large') {
    //         this.largedevice = true;
    //         this.smalldevice = false;
    //     }
    //     if (Devicetype === 'Small') {
    //          this.largedevice = false;
    //         this.smalldevice = true;
    //     }
    // }




    @track Societylogo = SocietyMSLogo;
    
    @track EventPage = false;
    @track ProfilePage = false;
    @track utilityPage = false;


    HandleProfile() {

        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
               url: "https://gauravlokhande-dev-ed.develop.my.site.com/sms/s/profilepage"
            }
        });
    }

    HandleEvent() {
      this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
               url: "https://gauravlokhande-dev-ed.develop.my.site.com/sms/s/"
            }
        });
    }

    
    HandleUtility() {
          this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
               url: "https://gauravlokhande-dev-ed.develop.my.site.com/sms/s/utilitypage"
            }
        });
    }

    HandleMaintenanceRequests() {
         this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
               url: "https://gauravlokhande-dev-ed.develop.my.site.com/sms/s/maintenancerequests"
            }
        });
    }

    HandleFeedaack() {
         this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
               url: "https://gauravlokhande-dev-ed.develop.my.site.com/sms/s/feedbackpage"
            }
        });
    }
}