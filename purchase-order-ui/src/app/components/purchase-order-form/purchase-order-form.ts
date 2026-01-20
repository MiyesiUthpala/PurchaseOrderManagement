import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrderService, PurchaseOrder } from '../../services/purchase-order.service';

@Component({
  standalone: true,
  selector: 'app-purchase-order-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase-order-form.html',
  styleUrls: ['./purchase-order-form.css']
})
export class PurchaseOrderFormComponent {
  po: PurchaseOrder = {
    poNumber: '',
    poDescription: '',
    supplierName: '',
    orderDate: '',
    totalAmount: null as any,
    status: ''
  };

  isEdit = false;

  constructor(
    private service: PurchaseOrderService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      // this.service.getById(+id).subscribe(data => this.po = data);
      this.service.getById(+id).subscribe(data => {
      this.po = data;
      // Format orderDate to yyyy-MM-dd for <input type="date">
      if (this.po.orderDate) {
        this.po.orderDate = this.po.orderDate.split('T')[0];  // Assumes ISO format; adjust if needed
      }
      this.cdr.detectChanges();
    });
    }
  }
  goHome() {
  this.router.navigate(['/']);
}

  save() {
      if (this.isEdit && this.po.id) {
    this.service.update(this.po.id, this.po).subscribe(() => {
      this.router.navigate(['/']).then(() => window.location.reload());  // Force reload
    });
  } else {
    this.service.create(this.po).subscribe(() => {
      this.router.navigate(['/']).then(() => window.location.reload());  // Force reload
    });
  }
  }
}
