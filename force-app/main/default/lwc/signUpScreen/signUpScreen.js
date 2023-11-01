import { LightningElement, track, api } from 'lwc';
import SignupUser from '@salesforce/apex/SocietyManagementSystem.createAccountAndContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class SignUpScreen extends NavigationMixin (LightningElement) {


    @track firstName;
    @track lastName;
    @track mobile;
    @track email;
    @track password;
    @track confirmpassword;



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

    handleConfirmPasswordChange(event) {
        this.confirmpassword = event.target.value;
    }

    handleSignUp() {

        if (this.password === this.confirmpassword) {
            
            SignupUser({
                firstName: this.firstName,
                lastName: this.lastName,
                Phone: this.mobile,
                email: this.email,
                Password: this.password
            })
                .then(result => {

                    this[NavigationMixin.Navigate]({
                        type: "standard__webPage",
                        attributes: {
                           url: "https://thecodingstudio-dev-ed.develop.my.site.com/sms/s/login"
                        }
                    });
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Logined Sucessfully',
                            variant: 'success'
                        })
                    );
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                });
        } else {
            alert('password not matched');
        }
      
    }


    handleLogin() {
         this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
               url: "https://thecodingstudio-dev-ed.develop.my.site.com/sms/s/login"
            }
          });
    }


}
