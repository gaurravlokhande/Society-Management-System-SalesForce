import { LightningElement, track, api } from 'lwc';
import SignupUser from '@salesforce/apex/SocietyManagementSystem.createAccountAndContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SignUpScreen extends LightningElement {
    @track firstName;
    @track lastName;
    @track mobile;
    @track email;

    @track SignupScreenTemplate = true;
    @track loginScreenTemplate = false;
    @track password = '';

    handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handlePhoneChange(event) {
        this.mobile = event.target.value;
    }

    handlePasswordChange(event) {
        this.password = event.target.value;
    }

    handleSignUp() {
        SignupUser({
            firstName: this.firstName,
            lastName: this.lastName,
            Phone: this.mobile,
            email: this.email
        })
        .then(result => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'sucerss',
                    variant: 'success'
                })
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'error',
                    variant: 'error'
                })
            );
        });
    }

    handleLogin() {
        this.SignupScreenTemplate = false;
        this.loginScreenTemplate = true;
    }
}
