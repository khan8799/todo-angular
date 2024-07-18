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
  currentView!: 'list' | 'grid';

  constructor(
    private _authService: AuthService,
    private router: Router,
    private _sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.userInfo$ = this._sharedService.user
    this._sharedService.view.subscribe(view => this.currentView = view)
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

  toggleView(view: 'list' | 'grid'): void {
    this._sharedService.toggleView(view)
  }
}
