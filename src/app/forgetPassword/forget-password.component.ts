import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SecurityQuestionService, SecurityQuestion } from '../services/security-question.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgetPassword',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {
     loginForm: FormGroup;
     isQuestionValidated = false;
     securityQuestions: any[] = [];

     constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private securityQuestionService: SecurityQuestionService,
      private router: Router
     ) {
      this.loginForm = this.fb.group({
        userId: ['', Validators.required],
        securityQuestion: ['', Validators.required],
        securityAnswer: ['', Validators.required],
        newPassword: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [{ value: '', disabled: true }, Validators.required] 
      });
     }

     ngOnInit(): void {
       this.loadSecurityQuestion();
     }

     loadSecurityQuestion(): void {
      this.securityQuestionService.getSecurityQuestion().subscribe(
        question => {
          this.securityQuestions = question;
          console.log("Security Question", this.securityQuestions);
        }, 
        error => {
          console.error('Error fetching security questions', error);
        }
      );
     }


     onReset() : void {
      this.loginForm.reset();
      this.isQuestionValidated = false;
      this.disablePasswordFields(false);
     }

     disablePasswordFields(enable: boolean): void {
      if (this.loginForm.controls['newPassword'] && this.loginForm.controls['confirmPassword']) {
        if (enable) {
          this.loginForm.controls['newPassword'].enable();
          this.loginForm.controls['confirmPassword'].enable();
        } else {
          this.loginForm.controls['newPassword'].disable();
          this.loginForm.controls['confirmPassword'].disable();
        }
      }
    }
    

    onSubmit(): void {
      if(this.loginForm.valid) {
        const {userId, securityQuestion, securityAnswer} = this.loginForm.value;

        this.authService.validateSecurityQuestion(userId, securityQuestion, securityAnswer).subscribe(
          (response: any) => {
            if(response.isValid){
              this.isQuestionValidated = true;
              this.disablePasswordFields(true);
            }
          },
          (error: any) => {
            const errorType = error.error?.errorType;
            switch (errorType) {
              case 'QuestionInvalid':
                alert("The security question is incorrect.");
                break;
              case 'AnswerInvalid':
                alert("The security answer is incorrect.");
                break;
              case 'UserNotFound':
                alert("User not found.");
                break;
              default:
                alert("Invalid credentials. Please try again.");
            }
          }
        );
      }else{
        console.log('Form is invalid');
      }
    }

    resetPassword(): void {
      if (this.loginForm.value.newPassword !== this.loginForm.value.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const {userId, newPassword} = this.loginForm.value;
      this.authService.resetPassword(userId,newPassword , {responseType: 'text'}).subscribe(
        (response) => {
          alert(response);
          this.router.navigate(['./login'])
          this.onReset();
        },
        error => {
          console.error('Password reset error', error);
        }
      )
    }
}