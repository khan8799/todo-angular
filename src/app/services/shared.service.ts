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

  public viewSource = new BehaviorSubject<'list' | 'grid'>('grid');
  public view = this.viewSource.asObservable();

  constructor() { }

  toggleLoading(status: boolean) {
    this.loadingSource.next(status);
  }

  changeUser(user: IUser | null) {
    this.userSource.next(user);
  }

  toggleView(view: 'list' | 'grid') {
    this.viewSource.next(view);
  }
}
