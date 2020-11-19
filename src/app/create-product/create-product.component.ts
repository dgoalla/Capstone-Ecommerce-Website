import { Component, OnInit } from '@angular/core';
import { AdminService } from '../_services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  updateform : boolean;
  formData : any = {};
  errors: any = [];
  msg : string;
  id: any;
  constructor(private adminService: AdminService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id)
    {
      this.updateform = true;
      this.adminService.getProductById(this.id).subscribe(res => {
        this.formData = {
          "id" : res[0]._id,
          "productname" : res[0].productname,
          "productdesc" : res[0].productdesc,
          "producttype" : res[0].producttype,
          "productimage" : res[0].productimage,
          "productprice" : res[0].productprice,
          "company" : res[0].company
        } 
        })
        return this.formData;
    }

  }


  addProduct()
  {
    this.adminService.createProduct(this.formData)
    .subscribe(() => {
        this.msg = "Product Created Successfully..."
     },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      });
  }


  updateProduct()
  {
    this.adminService.updateProduct(this.formData, this.formData.id)
    .subscribe(() => {
        this.msg = "Product Updated Successfully..."
     },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      });
  }
}



