public without sharing  class SocietyManagementSystem  {

//SIGNUP PAGE METHODS---------------------------------------------------------------------------------------------------------------
     // Create Account Contact And User 
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
    
//SIGNUP PAGE METHODS---------------------------------------------------------------------------------------------------------------  
      
    
   
//EVENT PAGE METHODS---------------------------------------------------------------------------------------------------------------

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

    
//To Check is user already registered or not
   //To Check is user already registered or not
    @AuraEnabled
    public static String checkUserRegistrationForEvent(String eventId){
        String currentUserName = UserInfo.getUserName();
        List<Event_Registration__c> eventRegList = [Select Id, Event__c, Email__c From Event_Registration__c Where Email__c =: currentUserName AND Event__c =: eventId];
        if (eventRegList.size() > 0) {
        return 'Already Registered';
        } 
        return 'Please Register';
    }
    
    
   // current user Register for events
@AuraEnabled
public static String registerForEvent(String eventId) {
    String currentUserName = UserInfo.getUserName();

    List<Event_Registration__c> eventRegistrations = [SELECT Event__c, Email__c, Resident__c FROM Event_Registration__c WHERE Event__c = :eventId AND Email__c = :currentUserName];

    if (eventRegistrations.size() > 0) {
        return 'Already Registered';
        } else {
        List<Contact> ListOfAllContact =[SELECT Id From Contact where Email =:currentUserName];  
        if (eventRegistrations.isEmpty()) {
            Event_Registration__c newRegistration = new Event_Registration__c();
            newRegistration.Event__c = eventId;
            newRegistration.Email__c = currentUserName;
            newRegistration.Resident__c =ListOfAllContact[0].Id;
            insert newRegistration;
            return 'User Registered Successfully';
        }
    }

    return 'User Not Registered';
}
//EVENT PAGE METHODS---------------------------------------------------------------------------------------------------------------

    
//Profile Page Methods---------------------------------------------------------------------------------------------------------------

    //Get Current User All Details
   @AuraEnabled(Cacheable=True)
    public static List<Account> getalluserDetails(){
        String currentUserName = UserInfo.getUserName();
        
        List<Account> getlistofacc =[Select Id, Name, Email__c,ProfilePicture__c, Phone, Society__r.Name, Flat_NO__c,Flat_Type__c,Total_Flat_Members__c From Account Where Email__c =:currentUserName];
        
        return getlistofacc;
    }

    
    
    
    
 //Get All Current User Account Related Contacts
  @AuraEnabled(Cacheable=True)
  public static List<Contact> UserAccountRelatedContacts() {   
 String currentUserName = UserInfo.getUserName(); 
      
 List<Account> relatedcontact = [Select Id, Name, Email__c From Account Where Email__c =:currentUserName]; 
      
 List<Contact> accountrelatedcon = new List<Contact>();
      
 if (!relatedcontact.isEmpty()) {
    for (Account account : relatedcontact) {
      List<Contact> contactsForAccount = [Select Id, AccountId, FirstName,LastName, Email, Phone, Society__r.Name From Contact Where AccountId=:account.Id];
      accountrelatedcon.addAll(contactsForAccount);
    }
   }
   
  return accountrelatedcon;
 }
    
 // For Deleting Contact
    @AuraEnabled
    public static String deleteContact(String contactId) {
        try {
            String currentUserName = UserInfo.getUserName();
            List<Contact> conList = [SELECT Id, FirstName, Email FROM Contact WHERE Id = :contactId AND Email != :currentUserName];

            if (conList.size() > 0) {
                delete conList;
                return 'Contact deleted successfully.';
            } else {
                return 'You canot Delete yourself, try to contact Admin';
            }
        } catch (Exception e) {
            return 'An error occurred while deleting the contact.';
        }
    }



 // For Insert Family Members
    @AuraEnabled
   public static String addFamilyMembers(String firstName, String lastName, String email, String phone) {
    String emailOfCurrentUser = UserInfo.getUserName();
    List<Account> accList = [SELECT Id, Email__c FROM Account WHERE Email__c = :emailOfCurrentUser LIMIT 1];
    if (accList.size() > 0) {
        Contact newContact = new Contact();
        newContact.AccountId = accList[0].Id;
        newContact.FirstName = firstName;
        newContact.LastName = lastName;
        newContact.Email = email;
        newContact.Phone = phone;
        insert newContact;
        return 'Contact Created';
    } else {
        return 'Account not found for the current user.';
    }
}
    
    
// Utility -----------------------------------------

    // for fetching data of utility payment of current user
    @AuraEnabled
    public static List<Utility_Payment__c>  getutilitybill(){
            String useremail = UserInfo.getUserName();
        List<Account> accList = [Select Id, Name FROM Account Where Email__c =:useremail];
        
        List<Utility_Payment__c> getcurreuntuserinvoice = [Select Name,	Flat__r.Name, Amount__c,Utility_Provider__r.Name,Status__c,Created_Date__c,Due_Date__c From Utility_Payment__c where Flat__c =:accList[0].Id];
        
        return getcurreuntuserinvoice;
    }
 
    
    
     // for paid bill status of current user
 @AuraEnabled
public static String changeUtilityStatus(String rowId) {
    String currentUserName = UserInfo.getUserName();

     List<Account> accList = [SELECT Id, Name, Email__c FROM Account WHERE Email__c = :currentUserName];

     List<Utility_Payment__c> utiList = [SELECT Id, Flat__c, Amount__c,Status__c
                                        FROM Utility_Payment__c WHERE Flat__c = :accList[0].Id AND Id =:rowId];

    if(utiList!=null){
     for (Utility_Payment__c utility : utiList) {
         if (utility.Status__c == 'Unpaid') {
             utility.Status__c = 'Paid';
             update utiList;
            return 'Bill paid Successfully';
         }
     }
    }
 return 'Bill Already Paid';
     
}
  

    
}