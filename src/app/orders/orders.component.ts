import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { checkout } from '../_models/checkout';
import { Product } from '../_models/Product';
import { viewOrder } from '../_models/viewOrder';
import { CustomerService } from '../_services/customer.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders : Array<viewOrder>;
  constructor( public custService : CustomerService, public auth : AuthService) { }
  products : Array<Product> = [];
  hasItems : boolean = false;
  ngOnInit(): void {


    this.custService.getOrders(this.auth.getUserById()).subscribe(res => {
    this.orders = res;
    for(let i=0; i<this.orders.length; i++)
    {
      let order = this.orders[i].orders;
      for(let j=0; j< order.length; j++)
      {
        this.custService.getProductById(order[j].productid).subscribe(data => {
          this.products.push(data[0]);
          this.hasItems = true
        });
      }
        
    }
    });

    

  }

}
