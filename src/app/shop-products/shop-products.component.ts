import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../_services/customer.service';
import { Product } from '../_models/Product';
import { CartItem } from '../_models/CartItem';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.css']
})
export class ShopProductsComponent implements OnInit {

  products : Array<Product>;
  errors: any = [];
  p: number = 1;

  cartItems: Array<CartItem>;
  totalPrice: number = 0;
  prod : Product;
  isCartEmpty : boolean = false;

  constructor(public custService : CustomerService) { }

  ngOnInit(): void {
    this.custService.getProducts().subscribe(data => {
      this.products = data
    },
    (errorResponse) => {
      this.errors.push(errorResponse.error.error);
    });
  }

  addItemtoCart(id)
  {
    if(id)
    {
      this.custService.getProductById(id).subscribe(res => {
        this.prod = res[0];
        let cartItem = {
          product : this.prod,
          quantity : 1
        }
        this.getProductInfo(id, cartItem);
        alert("item Added to cart.");
      },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      });

    }
  }


  getProductInfo(id, cartItem) : void
  {
    if (JSON.parse(localStorage.getItem('cart')) == null) {
      let cart: any = [];
      cart.push(JSON.stringify(cartItem));
      localStorage.setItem('cart', JSON.stringify(cart));
    } 
    else 
    {
      let cart: any = JSON.parse(localStorage.getItem('cart'));
      let index: number = -1;
      for (var i = 0; i < cart.length; i++) {
        let item: CartItem = JSON.parse(cart[i]);
        if (item.product._id == id) 
        {
          index = i;
          break;
        }
      }
  
      if (index == -1) {
        cart.push(JSON.stringify(cartItem));
        localStorage.setItem('cart', JSON.stringify(cart));
      } 
      else {
        let item: CartItem = JSON.parse(cart[index]);
        item.quantity += 1;
        cart[index] = JSON.stringify(item);
        localStorage.setItem("cart", JSON.stringify(cart));
      }   
    }
  }

}
