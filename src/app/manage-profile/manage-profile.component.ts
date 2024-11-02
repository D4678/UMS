import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../services/user-profile.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports:[CommonModule,ReactiveFormsModule, HttpClientModule],
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {

  profileForm: FormGroup;
  userId: string | null = localStorage.getItem('userId');
  isEditable =  false;

  constructor(private fb: FormBuilder, private userProfileService: UserProfileService, private route: ActivatedRoute) {
     this.profileForm = this.fb.group({
      id: [{value:'', disabled: true}],
      userName: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      dob: [{ value: '', disabled: true }],
      mobileNo: [{ value: '', disabled: true }],
      pincode: [{value: '', disabled: true}],
      country: [{value: '', disabled: true}],
      state:[{value: '', disabled: true}],
      city:[{value: '', disabled: true}],
     });
   }

   ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log("Received query params:", params);
      const userIdParam = params['userId'] || this.userId;
      if (userIdParam) {
        this.userProfileService.getUserprofile(userIdParam).subscribe({
          next: (data) => {
            console.log("Profile data received:", data);
            this.profileForm.patchValue(data);
          },
          error: (error) => console.error("Error fetching profile:", error)
        });
      } else {
        console.warn("Invalid or missing userId in query parameters.");
      }
    });
  }
  

  toggleEditMode(): void {
    this.isEditable = !this.isEditable;
    Object.keys(this.profileForm.controls).forEach(control => {
      if (control !== 'id') {
        this.isEditable ? this.profileForm.get(control)?.enable() : this.profileForm.get(control)?.disable();
      }
    });
  }

  saveChanges(): void {
    if(this.userId) {
      this.userProfileService.updateUserProfile(this.userId, this.profileForm.getRawValue()).subscribe(response => {
        alert("Profile Updated Sucsfull");
        this.toggleEditMode();
      });
    }
    else {
      console.error("user Id Not Found");
    }
  }
}