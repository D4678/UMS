import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule,CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
   loginForm: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
      this.loginForm = this.fb.group({
        userId: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  ngOnInit(): void {}

  onLogin() {
    const loginData = {
      userId: this.loginForm.value.userId,
      password: this.loginForm.value.password
    };
    console.log('login', loginData);
    
    this.http.post('https://localhost:7231/api/UserInfo/Login', loginData).subscribe(
      (response:any)=> {
        if(response && response.token) {
         localStorage.setItem('token', response.token);
         localStorage.setItem('userId', response.user.userId);

         this.router.navigate(['/dashboard']);
          console.log(`Welcome ${response.user.userId}`);
          
        }else{
          console.log("Invalid login credtials");
        }
      },
      error => {
        alert("invalid data")
      }
    );
  }

  }

