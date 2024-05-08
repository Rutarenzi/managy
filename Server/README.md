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

## technlogies used on the Server side

- Express JS
- Prism ORM with MongoDB

## All the features

> Note that everything must have the creator [relationships] except for the refrence data

**Control Pannel**

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
20. ~~Staff Status `[name]`~~ => (It's `Active` or `Inactive` )
21. Unit of Measurement `[name, prefix]`
22. Stock Item Categories `[name]`
23. Stock Item Reference `[name, StockItemCategory, UnitOfMeasurement, MinimumStockLevel, Maximum Stock Level, StockAlertLevel, isActive?]`
24. Vendors `[Address, Email, website, VAT NO, isBlackListed?]`

**Asset Nanagement**

The reports will be made later !!!!!

> All of these uses refrenceData wherever there is a selection option in the form
> They must have the ID of the creator
> It will be a form | table as specified in the brackets ()
> Every item in the table must have edit and delete options
> Only display an item created by the current user [no inteference]

1. Asset Registration (Form): `[Department, FunctionalLocation, AssetCategory, AssetItem, AssetCode, Description, ServiceStatus, AssetCondition, SerialNo, Note, Mas

nufacturer, Brand, Model, Vendor, AcquisitionDate, AcquisitionValue, DepreciationRate, ResidualValue, Re-evaluationValue, Re-evaluationDate, AssetPhoto!]`2. Asset register(Table):`[AssetCode, AssetCategory, AssetItem, UnitOfMeasurement, ,Model]`3. Asset Movement(Table with a button to add new):`[Asset, DestinationOffice, DateOfMovement, MovementReason, RequestedBy, ApprovedBy]`4. Asset Auditing records
5. Asset Custody records(table with a button to add new):`[AssetName, Custodian, IssuedBy, IssuedOn, ReceivedBy, returedBy Return ReceivedBy, ReturnOn]`

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

1. Request Items from Stock[form with table]: `store, item group, item, department, unitOfMeasurement, Quantity, isApproved,  AssetCode, Vendor, RequestedBy, Reason,`

Someone can request items from the stock and that request can be approved byt the user with admin role

2. Approve Stock Request [admin],

3. Goods Receivable Note: `delivery note (DL note), Supplier, Date, isDeliveryFinished?, Purchase Order, VAT no, GR Note`

4.stock Incoming Items: `DL note [ref to 2], Store, Item group, item, quantity, total price, receivedOn, Vendor, Manufacturing Date, Expiry date, Lot No`,

5.Stock Outgoing Items: `Item, Due Date, quantity, total price, reason`

6. Stock Movements: `Item, DestinationOffice, DateOfMovement, MovementReason,RequestedBy,ApprovedBy`

7. Stock Monthly report [be able to select startDate and endDate]

8. Stock issued Register
   contains all issued items

**Others**

1.  Emails on BE
2.  Notifications on FE (still figuring out how )
