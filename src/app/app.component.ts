import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./Navbar/navbar.component";
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent, SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private router: Router) {}
  title = 'EmployeeManagementUI';

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if(userId){
      this.router.navigate(['/dashboard'])
    }
  }
}
