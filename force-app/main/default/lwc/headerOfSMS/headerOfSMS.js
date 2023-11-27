import { LightningElement, track } from 'lwc';
import SocietyMSLogo from '@salesforce/resourceUrl/SocietyMS';
import { NavigationMixin } from 'lightning/navigation';

export default class HeaderOfSMS extends NavigationMixin(LightningElement)  {

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

    HandleFeedback() {
         this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
               url: "https://gauravlokhande-dev-ed.develop.my.site.com/sms/s/feedbackpage"
            }
        });
    }
}