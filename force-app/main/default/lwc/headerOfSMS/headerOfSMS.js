import { LightningElement, track } from 'lwc';
import SocietyMSLogo from '@salesforce/resourceUrl/SocietyMS';
import { NavigationMixin } from 'lightning/navigation';



export default class HeaderOfSMS extends NavigationMixin(LightningElement)  {

    



    @track Societylogo = SocietyMSLogo;
    
 
 toggleMenu() {
        const menuItems = this.template.querySelector('.menu-items');
        if (menuItems) {
            menuItems.classList.toggle('show');
        }
    }

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