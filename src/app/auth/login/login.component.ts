import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { ILoginPayload } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loginSubscription!: Subscription;
  loginError = {
    message: '',
    show: false
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe()
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      contact: [],
      password: []
    });
  }

  onSubmit(): void {
    this._sharedService.toggleLoading(true)
    timer(500).subscribe({next: () => this.login()})
  }

  login(): void {
    const loginData: ILoginPayload = {
      contact: this.loginForm.value.contact,
      password: this.loginForm.value.password
    }

    this.loginSubscription = this._authService
      .login(loginData)
      .subscribe({
        next: (res) => {
          this.loginForm.reset();
          this._sharedService.toggleLoading(false)
          this.router.navigate(['/'])
        },
        error: (e) => {
          this._sharedService.toggleLoading(false)
          this.loginError = {
            message: e.message,
            show: true
          }
        }
      })
  }

}
