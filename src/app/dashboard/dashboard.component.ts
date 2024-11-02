import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   
  userId: string | null =  localStorage.getItem('userId');
  
  constructor(private router: Router) {}
  ngOnInit() {
    if (this.userId) {
      console.log("Navigating with userId:", this.userId);
    } else {
      console.error("User ID not found in localStorage");
    }
  }
   
  onLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    

    this.router.navigate(['/login'])
  }

  openManageProfile() {
    if(this.userId)
    this.router.navigate(['/manage-profile'], {queryParams: {userId: this.userId}});
  else 
  console.log("User Id not Found in localStorage");
  }
}
