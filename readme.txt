# Purchase Order Management Application

## Project Overview
This project is a **Purchase Order Management System** that allows procurement staff to create, manage, and track purchase orders efficiently.  

**Tech Stack:**
- **Frontend: Angular 21, Angular Material  
- **Backend:  ASP.NET Core 10 (C#)  
- **Database: SQL Server  
- **API Documentation: Swagger  

---

## Features
1. **Purchase Orders**
   - Create, read, update, delete (CRUD)
   - Sort by date, PO number, or total amount
   - Filter by supplier or status
2. **Validation**
   - Unique PO number
   - Required fields for status, supplier, and order details
3. **Responsive UI**
   - Built with Angular Material
4. **API Documentation**
   - Accessible via Swagger at `/swagger`

---

## Assumptions Made
- Status field default is empty; placeholder “Select status” is shown.  
- Total amount field is empty initially; user must enter manually.  
- Database is SQL Server with trusted connection.  
- PO number is unique; duplicate PO numbers are not allowed.  
- Default page is 1, default sort by order date ascending.  
- Development environment: backend at `https://localhost:7085`, frontend at `http://localhost:4200`.  

---

## Folder Structure
PurchaseOrderApp/
├── PurchaserOrderApi/ # ASP.NET Core backend
│ ├── Controllers/ # API controllers
│ ├── Data/ # DbContext
│ ├── Models/ # Entity models
│ ├── appsettings.json # Configuration
│ └── PurchaseOrderApi.csproj
├── purchase-order-ui
│ ├── src/app/components/ # Angular frontend
  │          ├── Service
│ ├── angular.json
│ └── package.json