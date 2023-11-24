trigger CreateUtilityRecordsforInvoice on Utility_Invoice__c (after insert) {

  // trigger for if Utilityinvoice record Created by using utility invoice amount and socity: and society related accounts divide amount to total no of accounts on utility paymenr by craeating record of utility payment.
    List<Utility_Payment__c> utilityPayments = new List<Utility_Payment__c>();

    for(Utility_Invoice__c invoice : Trigger.new){
        if(invoice.Society__c != null){    

            List<Account> totalAccountsOfSociety = [SELECT Id, Name, Society__c FROM Account WHERE Society__c = :invoice.Society__c];
            
            Decimal storeAmount = invoice.Amount__c / totalAccountsOfSociety.size();
           
            for(Account acc : totalAccountsOfSociety){
                Utility_Payment__c utpay = new Utility_Payment__c();
                utpay.Amount__c = storeAmount;
                utpay.Flat__c = acc.Id;
                utpay.Due_Date__c = invoice.Due_Date__c;
                utpay.Created_Date__c = invoice.CreatedDate;
                utpay.Payment_Date__c = System.today();
                utpay.Utility_Invoice__c = invoice.Id;
                utpay.Due_Date__c = invoice.Due_Date__c;
                utpay.Status__c = 'Unpaid';
                utpay.Utility_Provider__c = invoice.Utility_Provider__c;

                utilityPayments.add(utpay);
            }
        }
    }

    if(!utilityPayments.isEmpty()){
        insert utilityPayments;
    }
}
