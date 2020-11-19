
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth/auth.guard';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ShopProductsComponent } from './shop-products/shop-products.component';
import { CartComponent } from './cart/cart.component';
import {OrdersComponent} from './orders/orders.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-user', component: CreateUserComponent , canActivate: [AuthGuard]},
  { path: 'create-user/:id', component: CreateUserComponent , canActivate: [AuthGuard]},
  { path: 'create-product', component: CreateProductComponent , canActivate: [AuthGuard]},
  { path: 'create-product/:id', component: CreateProductComponent , canActivate: [AuthGuard]},
  { path: 'manage-products', component: ManageProductsComponent , canActivate: [AuthGuard]},
  { path: 'shop-products', component: ShopProductsComponent , canActivate: [AuthGuard]},
  { path: 'cart', component: CartComponent , canActivate: [AuthGuard]},
  { path: 'orders', component: OrdersComponent , canActivate: [AuthGuard]},
  // { path: 'cart/:id', component: CartComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
