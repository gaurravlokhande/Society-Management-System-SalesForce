import { LightningElement, track } from 'lwc';
import addfeedback from '@salesforce/apex/SocietyManagementSystem.addfeedback';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';






export default class FeedbackPage extends LightningElement {


    @track subject;
    @track description;


    Handelsubjectchange(event) {
        this.subject = event.target.value;
    }
    
    handelfeedbackchande(event) {
          this.description = event.target.value;
    }

    handleClickofSubmit() {
            addfeedback({ Description: this.description, Subject: this.subject })
                .then((result) => {
                    if (result === 'Feedback already Submitted') {
                        this.dispatchEvent(new ShowToastEvent({
                            title: "title",
                            message: result,
                            variant: "warning"
                        }));

                    } else {
                        this.emptyallfields();
                        this.dispatchEvent(new ShowToastEvent({
                            title: "title",
                            message: result,
                            variant: "success"
                        }));
                    }

                        
        }).catch((error) => {
            this.dispatchEvent(new ShowToastEvent({
                title: "title",
                message: error.body.message,
                variant: "error"
            }));
        });
    }
  

    emptyallfields() {
        this.subject = null;
        this.description = null;
    }
}