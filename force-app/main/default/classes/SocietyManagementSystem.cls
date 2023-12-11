public without sharing  class SocietyManagementSystem  {

//SIGNUP PAGE METHODS---------------------------------------------------------------------------------------------------------------
     // Create Account Contact And User 
   @AuraEnabled 
    public static String createAccountAndContact(String firstName, String lastName, String email, String Phone, String Password) {
      
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
               user.ManagerId='2F0055j00000874WS';
            insert user;
           
            System.setpassword(user.Id,Password);
            
            site.login(user.Username,Password,'/sms/s');
        return 'user created successfully';
          
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
  /* 
    @AuraEnabled
    public static String checkUserRegistrationForEvent(String eventId){
        String currentUserName = UserInfo.getUserName();
        List<Event_Registration__c> eventRegList = [Select Id, Event__c, Email__c From Event_Registration__c Where Email__c =: currentUserName AND Event__c =: eventId];
        if (eventRegList.size() > 0) {
        return 'Already Registered';
        } 
        return 'Please Register';
    }
    
  */
    
    
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
    
    
    
    //fetch data of current user contact for register

  @AuraEnabled
 public static List<Contact> getUnregisteredContactForEvent(String eventId) { 
    String currentUserName = UserInfo.getUserName();
    List<Account> getAccounts = [SELECT Id, Name, Email__c FROM Account WHERE Email__c = :currentUserName LIMIT 1];
    
    List<Contact> getUnregisteredContacts = new List<Contact>();
    
    if (!getAccounts.isEmpty()) {
        List<Contact> allContacts = [SELECT Id, Name, Phone, Email FROM Contact WHERE AccountId IN :getAccounts];

        List<Event_Registration__c> eventRegList = [SELECT Resident__c FROM Event_Registration__c WHERE Resident__c != null AND Event__c = :eventId];
        Set<Id> registeredContactIds = new Set<Id>();
        
        // Collect the IDs of contacts registered for the event
        for (Event_Registration__c eventReg : eventRegList) {
            registeredContactIds.add(eventReg.Resident__c);
        }

        for (Contact con : allContacts) {
            if (!registeredContactIds.contains(con.Id)) {
                getUnregisteredContacts.add(con);
            }
        }
    }
    
    System.debug('getUnregisteredContacts: ' + getUnregisteredContacts);
    return getUnregisteredContacts;
}
    
    
    
   
    
    // register contacts for events
@AuraEnabled
public static String RegisterContactForEvents(String EventId, String ContactId) {
    List<Event_Registration__c> existingRegistrations = [SELECT Id FROM Event_Registration__c WHERE Event__c = :EventId AND Resident__c = :ContactId];
    List<Contact> contactInfo = [SELECT Id, Email FROM Contact WHERE Id = :ContactId];
    
    if (!existingRegistrations.isEmpty()) {
        return 'User already registered for this event';
    } else {      
        if (!contactInfo.isEmpty()) {
            for(Contact con : contactInfo) {
                Event_Registration__c newRegistration = new Event_Registration__c();
                newRegistration.Email__c = con.Email;
                newRegistration.Event__c = EventId;
                newRegistration.Resident__c = ContactId;
                insert newRegistration;
            }
            return 'User registered successfully'; 
        } else {
            return 'Contact not found';
        }  
    }
}


    
    
    
    

    
//Profile Page Methods---------------------------------------------------------------------------------------------------------------

    //Get Current User All Details
   @AuraEnabled
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
      List<Contact> contactsForAccount = [Select Id,Status__c, AccountId, FirstName,LastName, Email, Phone, Society__r.Name From Contact Where AccountId=:account.Id];
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
        newContact.Flat__c=accList[0].Id;
        newContact.Status__c='Pending';
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
        
        List<Utility_Payment__c> getcurreuntuserinvoice = [Select Name,	Flat__r.Name, Amount__c,Utility_Provider__r.Name,Payment_Status__c,	Status__c,Created_Date__c,Due_Date__c From Utility_Payment__c where Flat__c =:accList[0].Id];
        
        return getcurreuntuserinvoice;
    }
 
    
    
    
     // for paid bill status of current user
 @AuraEnabled
public static String changeUtilityStatus(String rowId) {
    String currentUserName = UserInfo.getUserName();

     List<Account> accList = [SELECT Id, Name, Email__c FROM Account WHERE Email__c = :currentUserName];

     List<Utility_Payment__c> utiList = [SELECT Id, Flat__c, Amount__c,Payment_Status__c
                                        FROM Utility_Payment__c WHERE Flat__c = :accList[0].Id AND Id =:rowId];

    if(utiList!=null){
     for (Utility_Payment__c utility : utiList) {
         if( utility.Payment_Status__c == 'New'){
             utility.Payment_Status__c = 'Pending';
             update utiList;
            return 'Bill paid Successfully';
         }
     }
    }
 return 'Bill Already Paid';
     
}
  
    

    
    
    // Maintenance request page-----------------------------------------------------------------------------------
    
    
    //Show Maintenance requests data 
    @AuraEnabled
    Public Static List<Maintenance_Request__c> returndatamaintreq(){
        String currentUserName = UserInfo.getUserName();
         //String currentUserName = 'dater64484@rdluxe.com';
        List<Account> getlist =[Select Id, Name, Email__c From Account Where Email__c=:currentUserName];
        List<Maintenance_Request__c> maintreqlist  =[Select Id,Name,Assigned_to__r.Name,Description__c,Flat__r.Name,Request_Date__c,Requested_By__r.Name,Society__r.Name,Status__c From Maintenance_Request__c Where Flat__c=:getlist[0].Id ];
        System.debug(maintreqlist);
        return maintreqlist;
    }
    
    
    // Add new maintenance request
@AuraEnabled
public static String addMaintenanceRequest(String description) {
    String currentUserName = UserInfo.getUserName();
    List<Account> accList = [SELECT Id, Society__c, Name, Email__c FROM Account WHERE Email__c = :currentUserName LIMIT 1];

    if (!accList.isEmpty()) {
        List<Contact> conList = [SELECT Id, AccountId FROM Contact WHERE AccountId = :accList[0].Id LIMIT 1];

        if (!conList.isEmpty()) {
            Maintenance_Request__c mainReq = new Maintenance_Request__c();
            mainReq.Description__c = description;
            mainReq.Flat__c = accList[0].Id;
            mainReq.Request_Date__c = System.today();
            mainReq.Society__c = accList[0].Society__c;
            mainReq.Requested_By__c = conList[0].Id;
            mainReq.Status__c = 'New';
            insert mainReq;

            return 'Maintenance Request added successfully';
        } else {
            return 'Error: Contact not found for the current user';
        }
    } else {
        return 'Error: Account not found for the current user';
    }
}
    

    
    //feedback page--------------------------------------------------------------------------------------------
   
    @AuraEnabled
    public static String addfeedback(String Description, String Subject){
        
    String currentUserName = UserInfo.getUserName();
           //  String currentUserName = 'dater64484@rdluxe.com';
        
        List<Account> accList =[Select Id,Email__c,Society__c, Name from Account where Email__c=:currentUserName];
        if(!accList.isEmpty()){
          
        List<Contact> conList =[Select Id, Name, Email From Contact Where AccountId=:acclist[0].Id AND Email=:accList[0].Email__c];
        if(!conList.isEmpty()){
            
        List<Feedback__c> feedback =[Select Society__c, Submitted_By__c From Feedback__c where Society__c=:accList[0].Society__c AND Submitted_By__c=:conList[0].Id ];
        if(!feedback.isEmpty()){
              return 'Feedback already Submitted';
         } else{
        Feedback__c feed =new Feedback__c();
        feed.Name =Subject;
        feed.Description__c=Description;
        feed.Submission_Date__c=System.today();
        feed.Society__c =accList[0].Society__c;
        feed.Submitted_By__c=conList[0].Id;
        Insert feed;
        return 'Feedback Submitted Successfull';
                  } 
       
            }
            return 'Conlist Empty';
        }
        return 'accList Empty';
    }
    

    
    // Show Society Data on Societyalldetails page
   
    @AuraEnabled
    public static List<Society__c> getinfoofsociety(){
         String currentUserName = UserInfo.getUserName();

        
        List<Account> accList =[Select Id, Society__r.Name From Account Where Email__c=:currentUserName ];
        
        List<Society__c> societydata =[Select Name,Total_no_of_flats__c,City__c,Society_Type__c,Address__c FROM Society__c where Name=:accList[0].Society__r.Name ];
        system.debug(societydata);
        return societydata;
        
    }
    
    
    @AuraEnabled
    public static List<Account> showallsocietymembers(){
        String currentUserName = UserInfo.getUserName();
           //String currentUserName = 'dater64484@rdluxe.com';
        List<Account> acclIst =[Select Id, Society__c, Email__c from Account Where Email__c =:currentUserName];
        if(!acclIst.isEmpty()){
         list<Account> allacclist =[ Select Id, Name,Email__c, Phone,Flat_No__c From Account Where Society__c=:acclist[0].Society__c];
            System.debug(allacclist);
            return allacclist;
        }
        return acclIst;
    }
    
    
    @AuraEnabled
    Public Static List<	Society_Staff__c> showallsocietystaff(){
         String currentUserName = UserInfo.getUserName();
         // String currentUserName = 'dater64484@rdluxe.com';
        List<Account> acclIst =[Select Id, Society__c, Email__c from Account Where Email__c =:currentUserName];
        
        List<Society_Staff__c> allsocietystaff =[Select Name,Email__c,Phone__c,Society__r.Name,Staff_Role__c from Society_Staff__c where Society__c=: acclIst[0].Society__c];
        System.debug(allsocietystaff);        
        return allsocietystaff;
        
    }
    
    
    
    
    //Show all Society Aminity  data
   @AuraEnabled
    Public Static List<Amenity__c> showsocietyamenity(){
        List<Amenity__c> socamenity =[Select Id,Name,Society__r.Name,Maintenance_Schedule__c,Description__c,amenity_Image__c,Booking_Rules__c, Availability__c	From Amenity__c ];
        system.debug(socamenity);
        return socamenity;
    }
   
    
    
   @AuraEnabled
    public static List<Visitor__c> fetchvisitorsdata(){
           String currentUserName = UserInfo.getUserName();
        List<Account> accList =[Select Id, Society__c from Account Where Email__c =:currentUserName];
        List<Visitor__c> visitorlist =[Select Id, Name,Address__c,Date_Time__c,Flat__r.Name From Visitor__c where flat__c=:accList[0].Id ];
        return visitorlist;
    }
   
    
  
   public static void deleteAccounts() {
    // Collect all user emails in a set for efficient comparison
    Set<String> userEmails = new Set<String>();
    for (User u : [SELECT Email FROM User]) {
        userEmails.add(u.Email);
    }

    // Query and delete accounts based on the user email set
    List<Account> acclistToDelete = [SELECT Id, Name, Email__c, Phone FROM Account WHERE Email__c NOT IN :userEmails];

    delete acclistToDelete;
}


     // visitors----------------------------------
     @AuraEnabled
    public Static List<Visitor__c> getvisitorlist(){
         String currentUserName = UserInfo.getUserName();

        List<Account> accList =[Select Id, Society__c from Account Where Email__c =:currentUserName];
        
        List<Visitor__c> getallvisitors =[Select Name, Flat__r.Name,Date_Time__c,Address__c FROM Visitor__c WHERE Flat__c=: accList[0].Id];
        
        return getallvisitors;
    }



}