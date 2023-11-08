public without sharing  class SocietyManagementSystem  {


// method to check wether current user contact society field is empty or not
@AuraEnabled(cacheable=true)
public static String isCurrentUserSocietyEmpty() {
    String UserEmail = UserInfo.getUserEmail();
    Contact userContact = [SELECT Society__c FROM Contact WHERE Email = :UserEmail LIMIT 1];
    if (userContact != null && String.isNotBlank(userContact.Society__c)) {
        return userContact.Society__c;
    } else {
        return 'False'; 
    }
}
    
    // return all events data in event page
     @AuraEnabled
    public static List<Event__c> SearchEventsForAlreadyRagstered(String AlreadyRagistered) {
        List<Event__c> events = [SELECT Id, Name, Date_and_Time__c, Location__c, Organizer__r.Name, Society__r.Name, Event_Image__c, Eligibility__c
            FROM Event__c
            WHERE Date_and_Time__c >= TODAY AND Society__c = :AlreadyRagistered];
        return events;
    }


    // for update the society on account for new user
    @AuraEnabled
public static String UpdateAccountSociety(String SocietyId) {
    String currentUserName = UserInfo.getUserName();    
    User currentUser = [SELECT Id,Username FROM User WHERE Username = :currentUserName LIMIT 1];  
    if (currentUser != null) {
        Account flatOwner = [SELECT Id, Society__c, Email__c FROM Account WHERE Email__c = :currentUser.Username LIMIT 1];   
        if (flatOwner != null && flatOwner.Society__c == null) {
            flatOwner.Society__c = SocietyId;
            update flatOwner;
            return 'Society__c field updated successfully';
        } else {
            return 'Society__c field is already populated';
        }
    } 
    return 'Account or User not found, or other issues occurred.';
}

    /*
    // Register for events
    @AuraEnabled
public static void registerForEvent(Id eventId) {
    String currentUserName = UserInfo.getUserName();
    
    List<Contact> residentList = [ SELECT Id, Email FROM Contact WHERE Email = :currentUserName LIMIT 1];
    
    List<Event_Registration__c> eventregistrationlist = [Select Email__c, Event__c, Resident__c FROM Event_Registration__c where Email__c =:residentList.Email ];
        
    for(Event_Registration__c eventregistration : eventregistrationlist ){
        if(eventregistration.Email== eventregistrationlist.Email__c && eventregistration.Society )
    }
    
    
    if (!residentList.isEmpty()) {
        Event_Registration__c registration = new Event_Registration__c();
        registration.Event__c = eventId;
        registration.Email__c =residentList[0].Email;
        registration.Resident__c = residentList[0].Id;
        insert registration;
    }
}
*/
    
     
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
    
    
    
  
      
    
   
   }