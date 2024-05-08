### INVICTUS RMF

**The project focuces on 4 things**

- Reference data
- Control Pannel
- Stock Management
- Store Management

_Run the prev app for reference!_

## Main features

- [ ] Admin user management `[ther is no signup (only login) the users will be created by the system admin]`
- [ ] control panel [`The admin part for contolling the system`]
- [ ] Stock management
- [ ] Store Management
- [ ] Stock and Store Reports
- [ ] Notifications by email
- [ ] Stock alerts

## technlogies used on the client side

- React js
- Tailwindcss
- Chakra UI

## All the features

> Note that everything must have the creator [relationships] except for the refrence data

**Control Panel**

1.  Admin user management: `the admin will be able to create delete and update users [credentials and roles] 2 roles: [admin, normal user]`

**Refrence data**
_Refrence data to be used in the whole application_

> Everything must have ID as usual
> Everything must have CRUD [create, read, update and delete] operations
> Some item have relationships for example [AssetItemReference and AssetItemRefrence]

**?** means `Boolean`

> The `[]` includes the all the properties apart from ID and creation dates

1. Asset maintenance levels `[name, description]`
2. Asset Categories `[name, usefulEConomicYears]`
3. Asset condition `[name]`
4. Asset Function Location `[name, description, location, department`]`
5. Asset Item reference `[name, assetCategory]`
6. Asset service status `[name]`
7. Bank branches `[name]`
8. Banks `[name]`
9. Departments `[name]`
10. Educational Levels `[name]`
11. Entity Information `[name, address, telephone, email, website, VAT No, blackListed?]`
12. Fields study `[name]`
13. Identify Document Type `[name]`
14. Staff Levels `[name]`
15. Job Titles `[name, staffLevel]`
16. ~~Marital Status `[name]`~~
17. Nationalities `[name]`
18. Office Locations `[name]`
19. Staff (staff member) `[staffId, Fname, Lname, email, email, Active?, Job title, Department, Action, maritalStatus]`
20. Staff Status `[name]`
21. Unit of Measurement `[name, prefix]`
22. Stock Item Categories `[name]`
23. Stock Item Reference `[name, StockItemCategory, UnitOfMeasurement, MinimumStockLevel, Maximum Stock Level, StockAlertLevel, isActive?]`
24. Vendors `[Address, Email, website, VAT NO, isBlackListed?]`

**Asset Management**

The reports will be made later !!!!!

> All of these uses refrenceData wherever there is a selection option in the form
> They must have the ID of the creator
> It will be a form | table as specified in the brackets ()
> Every item in the table must have edit and delete options
> Only display an item created by the current user [no inteference]

1. Asset Registration (Form): `[Department, FunctionalLocation, AssetCategory, AssetItem, AssetCode, Description, ServiceStatus, AssetCondition, SerialNo, Note, Manufacturer, Brand, Model, Vendor, AcquisitionDate, AcquisitionValue, DepreciationRate, ResidualValue, Re-evaluationValue, Re-evaluationDate, AssetPhoto!]`
2. Asset register(Table): `[AssetCode, AssetCategory, AssetItem, UnitOfMeasurement, ,Model]`
3. Asset Movement(Table with a button to add new): `[Asset, DestinationOffice, DateOfMovement, MovementReason,  cRequestedBy, ApprovedBy]`
4. Asset Auditing records
5. Asset Custody records(table with a button to add new): `[AssetName, Custodian, IssuedBy, IssuedOn, ReceivedBy, returedBy Return ReceivedBy, ReturnOn]`

6. Asset Maintenance Record(Table with a button to add new): `[Asset, MaintenanceDesciption, Notes, MaintenancePersonal, ApproveBy, MaintenanceCost,MaintenanceReqNo. MaintenanceDate, MaintenanceSupplier, MaintenanceLevel]`

7. Asse Maintenance Requests: `[Item==>Asset, RequiredMaintenance, MaintenanceLevel, RequestinStaff/Office, MaintenanceSupplier, PreparedBy, VerifiedBy, AuthorizedBy]`

8. Asset Reports ???

**Store Management**

The reports will be made later !!!!!

> All of these uses refrenceData wherever there is a selection option in the form
> They must have the ID of the creator
> It will be a form | table as specified in the brackets ()
> Every item in the table must have edit and delete options
> Only display an item created by the current user [no inteference]

1. Approve Stock Request,
2. Department Request Acheives
3. Goods Receivable Note
4. Item stock Movements
5. Items in stock
6. All stock Incoming Items
7. Items Issued Register
8. Items Recieved Register
9. Register Incoming Items
10. Register Outgoing Items
11. Request Items from Stock
12. Stock Statement
13. Vendor
14. Stock Montly Report
