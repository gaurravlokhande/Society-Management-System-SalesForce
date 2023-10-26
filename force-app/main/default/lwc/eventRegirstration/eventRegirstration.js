import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class EventRegirstration extends LightningElement {


    handleRegisterbutton() {

         this.template.querySelectorAll('lightning-input-field').forEach(field => {
            field.value = null;
         });
        
        this.dispatchEvent(new ShowToastEvent({
            title: "Registered",
            message: "Successfully Registered",
            variant: "success"
        }));
    }

    @track EventDataTemplate = false;
    @track RegistrationTemplate = true;

    handleCancel() {
        this.RegistrationTemplate = false;
        this.EventDataTemplate = true;
    }
}


      