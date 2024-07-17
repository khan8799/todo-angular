import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public loadingSource = new BehaviorSubject<any>(false);
  public loading = this.loadingSource.asObservable();

  public userSource = new BehaviorSubject<any>(null);
  public user = this.userSource.asObservable();

  constructor() { }

  toggleLoading(status: boolean) {
    this.loadingSource.next(status);
  }

  changeUser(user: IUser) {
    this.userSource.next(user);
  }
}
