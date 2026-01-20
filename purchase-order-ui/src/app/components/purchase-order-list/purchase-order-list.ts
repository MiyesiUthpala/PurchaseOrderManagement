import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PurchaseOrderService, PurchaseOrder, ApiResponse } from '../../services/purchase-order.service';

@Component({
  standalone: true,
  selector: 'app-purchase-order-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './purchase-order-list.html',
  styleUrls: ['./purchase-order-list.css']
})
export class PurchaseOrderListComponent implements OnInit {
  orders: PurchaseOrder[] = [];  // <-- plain array for table
  supplierFilter = '';
  statusFilter = '';
  sortBy = 'OrderDate';
  sortOrder = 'desc';
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalCount = 0;

  constructor(private service: PurchaseOrderService ,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.service.getAll({
      supplier: this.supplierFilter || undefined,
      status: this.statusFilter || undefined,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      page: this.currentPage,
      pageSize: this.pageSize
    }).subscribe((res: ApiResponse) => {
      console.log('Fetched data:', res);
      this.orders = res.data || [];           // Updated to match camelCase
      this.totalPages = res.totalPages || 1;  // Updated to match camelCase
      this.totalCount = res.totalCount || 0;  // Updated to match camelCase
  
    // Optional (safe, but not required)
    this.cdr.detectChanges();
    });
  }


  applyFilter() {
    this.currentPage = 1;
    this.loadOrders();
  }
    changeSort(sortField: string) {
      this.sortBy = sortField;
      this.sortOrder = 'asc';   // or 'desc' if you prefer
      this.currentPage = 1;
      this.loadOrders();
    }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadOrders();
    }
  }

  delete(id?: number) {
    if (!id) return;
    if (confirm('Delete this purchase order?')) {
      this.service.delete(id).subscribe(() => this.loadOrders());
    }
  }
}
