import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IUser } from '../models/auth.model';
import { SharedService } from '../services/shared.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isAuthenticated = false;
  userInfo$!: Observable<IUser>;

  constructor(
    private _authService: AuthService,
    private router: Router,
    private _sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.userInfo$ = this._sharedService.user
  }

  onLogoutClick(): void {
    this._authService
        .logout()
        .subscribe(
          res => {
            if (!res) return;

            this.isAuthenticated = false;
            this.router.navigate(['/auth']);
          });
  }
}
