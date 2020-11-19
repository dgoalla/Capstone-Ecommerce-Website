import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AdminService } from '../_services/admin.service';
import { User } from '../_models/User';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notify: string;
  users : Array<User>;
  msg : string;
  constructor(public auth: AuthService, public adminService: AdminService,  
              private router: Router, private route: ActivatedRoute, private _location: Location) { }

  ngOnInit(): void {
    //this.route.queryParams.subscribe((params) => {
      //const key1 = 'loggedin';

      if (this.auth.isAuthenticated()) {
        this.notify = 'You have been successfully loggedin. Welcome home';
      }
    //});

    this.adminService.getUsers().subscribe(data =>{
      console.log(data);
      this.users = data
    });
  }

  deleteUser(id: any){
    this.adminService.deleteUser(id).subscribe((res) => {
      alert("User deleted Successfully");
      location.reload();
    });
  }

}
