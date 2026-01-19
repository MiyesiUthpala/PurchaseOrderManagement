import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PurchaseOrderService, PurchaseOrder } from '../../services/purchase-order.service';

@Component({
  standalone: true,
  selector: 'app-purchase-order-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './purchase-order-list.html',
  styleUrls: ['./purchase-order-list.css']
})
export class PurchaseOrderListComponent {
  orders: PurchaseOrder[] = [];
  filteredOrders: PurchaseOrder[] = [];

  supplierFilter = '';
  statusFilter = '';

  constructor(private service: PurchaseOrderService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.service.getAll().subscribe(data => {
      console.log('Fetched data:', data);
      this.orders = data;
      this.applyFilter(); // Make sure filteredOrders is populated on first load
      this.cdr.detectChanges();
    }, error => {
      console.error('Error fetching orders', error);
      this.filteredOrders = []; // fallback
    });
  }

  applyFilter() {
    // Show all orders if filters are empty
    this.filteredOrders = this.orders.filter(o =>
      (!this.supplierFilter || (o.supplierName && o.supplierName.toLowerCase().includes(this.supplierFilter.toLowerCase()))) &&
      (!this.statusFilter || o.status === this.statusFilter)
    );
  }

  delete(id?: number) {
    if (!id) return;
    if (confirm('Delete this purchase order?')) {
      this.service.delete(id).subscribe(() => this.loadOrders());
    }
  }
}
