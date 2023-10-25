trigger RegistrationEmail on Event_Registration__c (before insert) {
    List<Messaging.SingleEmailMessage> emailList = new List<Messaging.SingleEmailMessage>();
    Set<Id> residentIds = new Set<Id>();
    Set<Id> eventIds = new Set<Id>();

    for (Event_Registration__c registration : Trigger.new) {
        if (registration.Email__c != null) {
            residentIds.add(registration.Resident__c);
            eventIds.add(registration.Event__c);
        }
    }

    Map<Id, Resident__c> residentsMap = new Map<Id, Resident__c>([SELECT Id, Name FROM Resident__c WHERE Id IN :residentIds]);
    Map<Id, Event__c> eventsMap = new Map<Id, Event__c>([SELECT Id, Name FROM Event__c WHERE Id IN :eventIds]);

    for (Event_Registration__c registration : Trigger.new) {
        if (registration.Email__c != null) {
            Resident__c resident = residentsMap.get(registration.Resident__c);
            Event__c event = eventsMap.get(registration.Event__c);

            if (resident != null && event != null) {
                Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
                email.setToAddresses(new String[] { registration.Email__c });
                email.setSubject('Registration Successful');
                email.setHtmlBody('Hello ' + resident.Name + ',<br/><br/>' +
                    'Your Registration for ' + event.Name + ' is Successful.<br/><br/>' +
                    'Thank You!');
                emailList.add(email);
            }
        }
    }

    Messaging.sendEmail(emailList);
}
