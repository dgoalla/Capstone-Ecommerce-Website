import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { Product } from '../_models/Product';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private uriseg = 'http://localhost:5000/api/users/';

  private prodUri = 'http://localhost:5000/api/products/';

  constructor(private http: HttpClient) { }

  public create(userData: any): Observable<User> { 
    return this.http.post<User>(this.uriseg, userData);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.uriseg);
  }

  public getUserById(id): Observable<User> {
    return this.http.get<User>(this.uriseg+id);
  }

  public updateUser(userData: any, id:any): Observable<User> {
    return this.http.put<User>(this.uriseg+id, userData);
  }

  public deleteUser(userId): Observable<User> {
    return this.http.delete<User>(this.uriseg+userId);
  }


  //*****************************   Product     ******************************** */

  public createProduct(productData: any): Observable<Product> { 
    return this.http.post<Product>(this.prodUri, productData);
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.prodUri);
  }

  public getProductById(id): Observable<Product> {
    return this.http.get<Product>(this.prodUri + id);
  }

  public updateProduct(productData: any, id:any): Observable<Product> {
    return this.http.put<Product>(this.prodUri + id, productData);
  }

  public deleteProduct(userId): Observable<Product> {
    return this.http.delete<Product>(this.prodUri + userId);
  }
}
