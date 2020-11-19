import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../_models/Product';
import { checkout } from '../_models/checkout';
import { viewOrder } from '../_models/viewOrder';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private prodUri = 'http://localhost:5000/api/products/';
  private orderUri = 'http://localhost:5000/api/orders/';

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.prodUri);
  }

  public getProductById(id): Observable<Product> {
    return this.http.get<Product>(this.prodUri + id);
  }

  public deleteProduct(userId): Observable<Product> {
    return this.http.delete<Product>(this.prodUri + userId);
  }

  public storeOrderList(orderdata): Observable<checkout[]> {
    return this.http.post<checkout[]>(this.orderUri,  orderdata);
  }

  public getOrders(id): Observable<viewOrder[]> {
    return this.http.get<viewOrder[]>(this.orderUri + "orders/" +id);
  }
}

