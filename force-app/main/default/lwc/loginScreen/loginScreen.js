import { LightningElement, track } from 'lwc';
import salesforceicon from '@salesforce/resourceUrl/SalesforceIcon';

export default class LoginScreen extends LightningElement {

    @track SigupScreenTemplate = false;
    @track loginTemplate = true;

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
        this.SigupScreenTemplate = true;
        this.loginTemplate = false;
    }
}