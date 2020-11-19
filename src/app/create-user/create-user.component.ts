import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../_services/admin.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  formData: any = {};
  errors: any = [];
  msg : string;
  id : any;
  updateform : boolean;
  constructor(private adminService: AdminService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id)
    {
      this.updateform = true;
      this.adminService.getUserById(this.id).subscribe(res => {
        this.formData = {
          "id" : res[0]._id,
          "username" : res[0].username,
          "password" : res[0].password,
          "email" : res[0].email,
          "userrole" : res[0].userrole
        } 
        })
        return this.formData;
    }
    
  }

  createUser()
  {
    this.adminService.create(this.formData)
    .subscribe(() => {
        this.msg = "User Created Successfully..."
     },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      });
  }

  updateUser()
  {
    this.adminService.updateUser(this.formData, this.formData.id)
    .subscribe(() => {
        this.msg = "User details updated Successfully..."
     },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      });
  }
}
