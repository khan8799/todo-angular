import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ILoginPayload, IUser } from '../models/auth.model';
import { Users } from '../auth/User';
import { SharedService } from './shared.service';
import {randomString} from '../utilities/randomString';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: IUser[] = Users;

  constructor(
    private _sharedService: SharedService
  ) { }

  isAuthenticated(): Observable<boolean> {
    return new Observable(observer => {
      if (localStorage.getItem('token') === null) observer.error(false);
      else observer.next(true);
    })
  }

  login(data: ILoginPayload): Observable<IUser> {
    return new Observable(observer => {
      const index = this.users.findIndex(user => user.contact === data.contact && user.password === data.password )
      if (index === -1) {
        observer.error({status: 401, message: 'Authentication failed'})
      } else {
        const user = this.users[index]
        this.userData = user
        this._sharedService.changeUser(user)
        observer.next(user)
      }
    });
  }

  logout(): Observable<boolean>{
    return new Observable(observer => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this._sharedService.changeUser(null)
      observer.next(true);
    });
  }

  set userData(user: IUser) {
    localStorage.setItem('token', randomString());
    localStorage.setItem('user', JSON.stringify(user));
  }
}
