public with sharing  class SocietyManagementSystem  {

    @AuraEnabled
  public static List<Event__c> SearchEvents(String searchinit) {
    String keystring = '%' + searchinit + '%';
    return [SELECT Id, Name, Date_and_Time__c, Location__c,Organizer__r.Name,Society__r.Name, Event_Image__c, 
            Eligibility__c FROM Event__c WHERE Date_and_Time__c >= TODAY AND Name LIKE :keystring];
   }

    
    
   @AuraEnabled 
    public static String createAccountAndContact(String firstName, String lastName, String email, String Phone) {
        try {
             Account acc = new Account();
             acc.Name = firstName + ' ' + lastName;
             acc.Email__c = email;
             acc.Phone =Phone;
             insert acc;

             Contact con = new Contact();
                con.AccountId = acc.Id;
                con.FirstName = firstName;
                con.LastName = lastName;
                con.Email = email;
                con.Phone =Phone;
                insert con;
            
            // Create a User record related to the Contact
            User user = new User();
                user.Username = email;
                user.ContactId = con.Id;
                user.LastName = lastName;
                user.FirstName = firstName;
                user.Email = email;
                user.Alias = 'U-' + String.valueOf(Crypto.getRandomInteger()).substring(0, 6);
                user.CommunityNickname = email;
                user.TimeZoneSidKey = 'GMT';
                user.LocaleSidKey = 'en_US';
                user.EmailEncodingKey = 'UTF-8';
               Profile desiredProfile = [SELECT Id FROM Profile WHERE Name = 'Customer Community Plus Login User' LIMIT 1];
               user.ProfileId = desiredProfile.Id;
                user.LanguageLocaleKey = 'en_US';
                user.IsActive = true;

            insert user;
 
            return 'Success: Account and Contact created with ID ' + acc.Id;
        } catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }


   
   }