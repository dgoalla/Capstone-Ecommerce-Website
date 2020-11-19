import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_models/Product';
import { CartItem } from '../_models/CartItem';
import { CustomerService } from '../_services/customer.service';
import {  checkout } from '../_models/checkout';
import { lang } from 'moment';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Array<CartItem>;
  totalPrice: number = 0;
  errors : any =[];
  prod : Product;
  isCartEmpty : boolean = false;
  removequant : boolean = false;

  constructor(public custService : CustomerService, public router : Router, public route : ActivatedRoute, public auth: AuthService,) { }

  ngOnInit(): void {

      this.loadCart();

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
      if(this.removequant)
      {
        item.quantity -= 1;
      }
      else
      {
        item.quantity += 1;
        cart[index] = JSON.stringify(item);
      }
      if(item.quantity > 0)
      {
        cart[index] = JSON.stringify(item);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      else
      {
        this.removeItem(id);
      }
      
    }   
  }
}

loadCart(): void {
  this.totalPrice = 0;
  this.cartItems = [];
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (cart != null && cart.length > 0) {
      for (var i = 0; i < cart.length; i++) {
        let item = JSON.parse(cart[i]);
        this.cartItems.push({
          product: item.product,
          quantity: item.quantity
        });
        this.totalPrice += item.product.productprice * item.quantity;
      }
  }
else
{
  this.isCartEmpty = true;
}
}

removeItem(id)
{
    let cart: any = JSON.parse(localStorage.getItem('cart'));
   
		for (var i = 0; i < cart.length; i++) {
			let item: CartItem = JSON.parse(cart[i]);
			if (item.product._id == id) {
        cart.splice(i, 1);
				break;
			}
    }
		localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item removed from cart successfully.")
    this.loadCart();
}

addquantity(id, quant)
{
    if(id)
    {
      this.removequant = false;
      this.custService.getProductById(id).subscribe(res => {
        this.prod = res[0];
        let cartItem = {
          product : this.prod,
          quantity : quant
        }
        this.getProductInfo(id, cartItem);
        this.loadCart();
      },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      });

    }
}

removequantity(id, quant)
{
  if(id)
    {
      this.removequant = true;
      this.custService.getProductById(id).subscribe(res => {
        this.prod = res[0];
        let cartItem = {
          product : this.prod,
          quantity : quant
        }
        this.getProductInfo(id, cartItem);
        this.loadCart();
      },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      });
    }
}

checkout()
{
  let cart: any = JSON.parse(localStorage.getItem('cart'));
  let checkoutItemList : Array<checkout> = [];
  for (var i = 0; i < cart.length; i++) 
  {
    let item: CartItem = JSON.parse(cart[i]);
    let checkoutItem : checkout;
    checkoutItem = {
      "productid" : item.product._id, 
      "quantity" : item.quantity, 
      "userid" : this.auth.getUserById()}
    checkoutItemList.push(checkoutItem);
  }

  this.custService.storeOrderList(checkoutItemList).subscribe(() => {
    localStorage.setItem('cart', null);
    this.router.navigate(["/orders"]);
  },
  (errorResponse) => {
    this.errors.push(errorResponse.error.error);
  });
}

}
