import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router';
import { CountryService, Country } from '../services/country.service';
import { HttpClientModule } from '@angular/common/http';
import { StateService, State } from '../services/state.service';
import { CityService, City } from '../services/city.service';
import { SecurityQuestionService, SecurityQuestion } from '../services/security-question.service';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] 
})
export class SignupComponent implements OnInit {
  
  signupForm: FormGroup;
  countries: Country[] = [];
  states: State[] = [];
  cities: City[] = [];
  securityQuestion: SecurityQuestion[] = [];
  
  constructor(
    private fb: FormBuilder, 
    private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private securityQuestionService: SecurityQuestionService,
    private signupService: SignupService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      // Account Information
      userId: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      cpassword: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      securityQuestion: ['', Validators.required],
      securityAnswer: ['', Validators.required],

      // Personal Information
      name: ['', Validators.required],
      Dob: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      street: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  ngOnInit(): void {
    console.log('Component initialized, loading countries...');
    this.loadCountries();
    // this.loadStates();
    // this.loadCities();
    this.loadSecurityQuestion();

    this.signupForm.get('country')?.valueChanges.subscribe(countryId=> {
      this.states = [];
      this.cities = [];
      this.signupForm.get('state')?.setValue('');
      this.signupForm.get('city')?.setValue('');

      if(countryId) {
        this.loadStatesByCountry(countryId);
      }
    });

    this.signupForm.get('state')?.valueChanges.subscribe(stateId=>{
      this.cities = [];
      this.signupForm.get('city')?.setValue('');

      if(stateId) {
        this.loadCitiesByState(stateId);
      }
    });
  }
  

  loadCountries(): void {
    this.countryService.getCountries().subscribe(
      (countries) => {
        this.countries = countries;
        console.log('Countries loaded:', this.countries); 
      },
      (error) => {
        console.error('Error fetching countries', error);
      }
    );
  }

  loadStatesByCountry(countryId:number): void {
    this.stateService.getStates(countryId).subscribe(
      (states)=> {
        this.states = states;
        console.log("States loaded for country", countryId, this.states)
      },
      (error) => {
        console.log('error', error);    
      }
    );
  }

  loadCitiesByState(stateId: number): void {
    this.cityService.getCities(stateId).subscribe(
      (cities) => {
        this.cities = cities;
        console.log("Cities loaded for state:", stateId, this.cities);
      },
      (error) => {
        console.error('Error fetching cities', error);
      }
    );
  }


  loadSecurityQuestion(): void {
    this.securityQuestionService.getSecurityQuestion().subscribe(
      (question) => {
        this.securityQuestion = question;
      },
      (error) => {
        console.log("Error", error);
      }
    )
  }

  onSubmit() {
    if (this.signupForm.valid) {
      if (this.signupForm.value.password !== this.signupForm.value.cpassword) {
        alert("Passwords do not match");
        return; 
      }
  
      const dobValue = this.signupForm.value.Dob;

     
      let formattedDOB = null;
      if (dobValue) {
        try {
          formattedDOB = new Date(dobValue).toISOString();
        } catch (error) {
          console.error("Invalid date format:", error);
       
          return;
        }
      }

      const UserInfoDto = {
        userId: this.signupForm.value.userId,
        userName: this.signupForm.value.name,
        password: this.signupForm.value.password,
        email: this.signupForm.value.email,
        DOB: formattedDOB, 
        Gender: this.signupForm.value.gender === 'Male' ? 0: 1,
        street: this.signupForm.value.street,
        countryId: this.signupForm.value.country,
        stateId: this.signupForm.value.state, 
        cityId: this.signupForm.value.city,
        pincode: this.signupForm.value.pincode,
        mobileNo: this.signupForm.value.mobile,
        securityQuestionId: this.signupForm.value.securityQuestion,
        securityAnswer: this.signupForm.value.securityAnswer
        
      };
  
      console.log("Submitting UserInfoDto:", UserInfoDto);
      console.log(this.signupForm.value.Dob);
      
  
      this.signupService.createUser(UserInfoDto).subscribe({
        next: (response) => {
          console.log("User signed up", response);
          this.router.navigate(['./login']);
        },
        error: (error) => {
          console.error('Submission failed', error);
          // console.error('Error details:', error.error); 
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
