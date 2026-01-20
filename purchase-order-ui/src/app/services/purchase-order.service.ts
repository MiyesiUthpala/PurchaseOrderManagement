import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PurchaseOrder {
   id?: number;
  poNumber: string;
  poDescription: string;
  supplierName: string;
  orderDate: string;
  totalAmount: number;
  status: string;
}

export interface ApiResponse {
  data: PurchaseOrder[];
  totalPages: number;
  totalCount: number;
  page: number;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class PurchaseOrderService {
  private apiUrl = 'http://localhost:7085/api/purchaseorders';

  constructor(private http: HttpClient) {}
  
  getAll(params?: { supplier?: string; status?: string; sortBy?: string; sortOrder?: string; page?: number; pageSize?: number }): Observable<ApiResponse> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key as keyof typeof params] !== undefined) {
          httpParams = httpParams.set(key, params[key as keyof typeof params]!.toString());
        }
      });
    }
    return this.http.get<ApiResponse>(this.apiUrl, { params: httpParams });
  }


  getById(id: number): Observable<PurchaseOrder> {
    return this.http.get<PurchaseOrder>(`${this.apiUrl}/${id}`);
  }

  create(po: PurchaseOrder) {
    return this.http.post(this.apiUrl, po);
  }

  update(id: number, po: PurchaseOrder) {
    return this.http.put(`${this.apiUrl}/${id}`, po);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
