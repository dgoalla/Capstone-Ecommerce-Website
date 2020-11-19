import { Component, OnInit } from '@angular/core';
import { AdminService } from '../_services/admin.service';
import { Product } from '../_models/Product';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  products : Array<Product>;
  prod : Product;
  viewdetails : boolean = false;
  constructor(public adminService: AdminService) {}

  ngOnInit(): void {

    this.adminService.getProducts().subscribe(data =>{
      this.products = data
    });
    
  }

  deleteProduct(id: any){
    this.adminService.deleteProduct(id).subscribe((res) => {
      alert("Product deleted Successfully");
      location.reload();
    });
  }

  Viewdetails(id : any){
    this.viewdetails = true;
    this.adminService.getProductById(id).subscribe((res) => {
      console.log(res);
      this.prod = res[0];
    });
  }

  back(){
    this.viewdetails = false;
  }

}
