public without sharing  class SocietyManagementSystem  {

    @AuraEnabled
  public static List<Event__c> SearchEvents(String searchinit) {
    String keystring = '%' + searchinit + '%';
    return [SELECT Id, Name, Date_and_Time__c, Location__c,Organizer__r.Name,Society__r.Name, Event_Image__c, 
            Eligibility__c FROM Event__c WHERE Date_and_Time__c >= TODAY AND Name LIKE :keystring];
   }

    
    
   @AuraEnabled 
    public static void createAccountAndContact(String firstName, String lastName, String email, String Phone, String Password) {
      
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
               Profile desiredProfile = [SELECT Id FROM Profile WHERE Name = 'Society Management System User' LIMIT 1];
               user.ProfileId = desiredProfile.Id;
                user.LanguageLocaleKey = 'en_US';
                user.IsActive = true;
        
   
            insert user;
            System.setpassword(user.Id,Password);
            site.login(user.Username,Password,'/sms/s');
 
          
    }
    
      @AuraEnabled
    public static void registerForEvent(Id eventId) {
 
    List<Resident__c> residentList = [SELECT Id, Name FROM Resident__c];
    List<User> userList = [SELECT Id, Name FROM User WHERE Id = :UserInfo.getUserId()];
   
    Event_Registration__c registration = new Event_Registration__c();
    registration.Event__c = eventId;
    
    for (Resident__c resident : residentList) {
        for (User user : userList) {
            if (resident.Name == user.Name) {
                
                registration.Resident__c = resident.Id;
                insert registration;
                return; 
            }
        }
    }
  }
   
   }