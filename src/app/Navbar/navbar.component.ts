import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule, Router,  NavigationEnd } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { HttpClientModule } from "@angular/common/http";


@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterModule, HttpClientModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit{
    isLoggedIn: boolean = false;
    userId: string | null = null;
    Selected: string = 'login';

   constructor(private authService: AuthService, private router: Router) {}

   select(button: string){
    this.Selected = button;
   }

//    ngOnInit(): void {
    
//        this.isLoggedIn = this.authService.isLoggedIn();
//        this.userId = this.authService.getUserId();
  
//    }


ngOnInit(): void {
   
    this.checkLoginState();

    // Subscribe to route changes to detect when to update the login state
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkLoginState();
      }
    });
  }

  checkLoginState(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userId = this.authService.getUserId();
    console.log('Navbar isLoggedIn:', this.isLoggedIn);
  }

   logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userId = null;
    this.router.navigate(['./login'])
    
   }
}