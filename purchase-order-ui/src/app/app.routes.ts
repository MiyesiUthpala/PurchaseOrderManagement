import { Routes } from '@angular/router';
import { PurchaseOrderListComponent } from './components/purchase-order-list/purchase-order-list';
import { PurchaseOrderFormComponent } from './components/purchase-order-form/purchase-order-form';


export const routes: Routes = [
  { path: '', component: PurchaseOrderListComponent },
  { path: 'create', component: PurchaseOrderFormComponent },
  { path: 'edit/:id', component: PurchaseOrderFormComponent }
];

