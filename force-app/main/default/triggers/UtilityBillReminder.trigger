trigger UtilityBillReminder on Flat__c ( before update) {
    List<Messaging.SingleEmailMessage> emailList = new List<Messaging.SingleEmailMessage>();

    for (Flat__c ft : Trigger.new) {
        if(ft.Utility_Bill__c != null && ft.Email__c!=null){
        Messaging.SingleEmailMessage emailMsg = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[] { ft.Email__c };
        emailMsg.setToAddresses(toAddresses);

        emailMsg.setSubject('Utility Bill Reminder');
    

        String emailBody = 'Hello ' + ft.Flat_Owner__c + ',<br/><br/>' +
            'This is a friendly reminder regarding your upcoming utility bill for your flat.<br/><br/>' +
            'Bill Amount: ' + ft.Utility_Bill__c + '<br/>' +
            'Please make your payment by the due date to avoid any late fees or service interruptions.<br/>' +
            'If you have already made the payment, thank you.<br/><br/>' +
            'Thank You!';

        emailMsg.setHtmlBody(emailBody);
        emailList.add(emailMsg);
        }
    }
    Messaging.sendEmail(emailList);
}