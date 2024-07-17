import { Component, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showLoading$: Observable<boolean> = of(false);
   
  constructor(
    private _sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.showLoading$ = this._sharedService.loading
  }
}
