import { LightningElement, track } from 'lwc';
import salesforceicon from '@salesforce/resourceUrl/SalesforceIcon';
import { NavigationMixin } from 'lightning/navigation';

export default class LoginScreen extends NavigationMixin (LightningElement) {

    @track salesforceicon = salesforceicon;

 

    @track username = '';
    @track password = '';


    handleUsername(event) {
        this.username = event.target.value;
    }

    handlePassword(event) {
        this.password = event.target.value;
    }

 

    handleLogin() {
        
    }

    handleForgotPassword() {
      
    }



    handleSignup() {

          this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
               url: "https://thecodingstudio-dev-ed.develop.my.site.com/sms/s/login/SelfRegister"
            }
          });
         
        
    }



}