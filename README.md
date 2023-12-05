# Project Name: Society Management System

```
## Whole Objects And Fields Documentation:
[SOCIETY MANAGEMENT SYSTEM Objects.txt](https://github.com/gaurravlokhande/Society-Management-System-SalesForce/files/13559350/SOCIETY.MANAGEMENT.SYSTEM.Objects.txt)
```

```
## Schema Diagram Of SMS:
![Society Management System ERD](https://github.com/gaurravlokhande/Society-Management-System-SalesForce/assets/119065314/94dd1020-4117-4c7e-86ba-e962db75a6a7)
```




![Login - Google Chrome 2023-11-30 17-16-07](https://github.com/gaurravlokhande/Society-Management-System-SalesForce/assets/119065314/95c8a987-7936-46bb-b8d8-2563f4fc64be)
![profilePage js - SocietyManagementSystem - Visual Studio Code 2023-11-30 18-06-26](https://github.com/gaurravlokhande/Society-Management-System-SalesForce/assets/119065314/399840ee-28f6-4875-81c0-d44bd80961d7)


## For Explore The Website Go to:
```
https://gauravlokhande-dev-ed.develop.my.site.com/sms
```

## For Login into Website Enter:
```
Email : yaweto6102@dabeixin.com
Password : Gaurav@123
```


```
## Project Description:
The Society Management System is a comprehensive solution developed on Salesforce, aimed at streamlining and optimizing various processes within a society. It efficiently manages information related to flats, society members, amenities, utility bills, visitors, events, and more.

## Technology Used:

For Admin Side:
- Objects: Utilized to define and organize data structures.
- Flow: Implemented for automating and guiding business processes.
- Profiles: Configured to control access and permissions.
- Sharing Rules: Established to control data visibility.

For Development Side:
- Lightning Web Components: Used for building dynamic and responsive user interfaces.
- HTML, CSS, JavaScript: Employed for frontend development.
- SOQL (Salesforce Object Query Language): Used for querying and retrieving data from Salesforce.
- Apex: Leveraged for server-side development and custom logic implementation.

Deployed on: Salesforce Digital Experience Cloud

## User Perspective:
1. User Registration:
   - Upon logging in as a new user, a popup prompts the selection of a society.
   - User registers as a member upon society selection.

2. Access to Society Facilities:
   - Users gain access to society amenities like gym, swimming pool, etc.
   - Information about events, society staff, and fellow members is readily available.

3. Utility Bill Management:
   - Users receive utility bills reflecting their usage.
   - Convenient platform to view and manage utility expenses.

4. Maintenance Requests:
   - Users can submit maintenance suggestions through the dedicated tab.
   - Requests are assigned to specific society staff for prompt resolution.

5. Family Management:
   - Users can add family members and register them for events.
   - Simplifies the management of family-related information within the society.

6. Feedback System:
   - Members can provide feedback on various aspects of the society.
   - Feedback mechanisms contribute to continuous improvement.

      The Society Management System on Salesforce Digital Experience Cloud provides a user-friendly interface for society members to efficiently interact with and manage various aspects of their community. From amenities and events to utility bills and maintenance requests, the platform ensures a seamless and organized experience for all users.
```
<br> <br>
```
## Utility Payments Approval Process:

1. Status Transition:
   - Initial Status: Unpaid
   - User Action - Click on Pay:
     - New Status: Submit for Approval
     - Assigned to: Manager or Specific User
   - Manager/User Approval:
     - Approval:
       - New Status: Approved
       - Further Action: Mark as Paid
       - Notification: Send approval email
     - Rejection:
       - New Status: Unpaid
       - Notification: Send rejection email

2. Fields:
   - Amount Status:
     - Options: Paid, Unpaid
   - Status:
     - Options: Submit for Approval, Rejected, Approved

## Profile Page Approval Process:

1. Status Transition:
   - Initial Status: Submit for Approval
   - User Action - New Family Member Add:
     - New Status: Submit for Approval
     - Assigned to: Manager or Specific User
   - Manager/User Approval:
     - Approval:
       - New Status: Approved
       - Notification: Send approval email
     - Rejection:
       - New Status: Rejected
       - Notification: Send rejection email

2. Fields:
   - Status:
     - Options: Submit for Approval, Approved, Rejected

## Explanation:

1. Utility Payments Approval Process:
   - Users initiate payment, moving the status to "Submit for Approval."
   - Assigned managers or users approve or reject the payment.
   - If approved, the status changes to "Approved" and the payment is marked as "Paid," triggering an approval email.
   - If rejected, the status reverts to "Unpaid," and a rejection email is sent.


2. Profile Page Approval Process:
   - When a new family member is added, the status is set to "Submit for Approval."
   - Assigned managers or users approve or reject the addition.
   - If approved, the status changes to "Approved," triggering an approval email.
   - If rejected, the status becomes "Rejected," and a rejection email is sent.


```
