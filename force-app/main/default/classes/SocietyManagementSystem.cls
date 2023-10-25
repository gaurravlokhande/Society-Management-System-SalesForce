public with sharing  class SocietyManagementSystem {

    @AuraEnabled(Cacheable=true)
  public static List<Event__c> SearchEvents(String searchinit) {
    String keystring = '%' + searchinit + '%';
    return [SELECT Id, Name, Date_and_Time__c, Location__c,Organizer__r.Name,Society__r.Name, Event_Image__c, Eligibility__c FROM Event__c WHERE Date_and_Time__c >= TODAY AND Name LIKE :keystring];
   }

    
}