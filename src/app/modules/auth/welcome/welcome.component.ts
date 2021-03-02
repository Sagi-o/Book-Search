import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, Actions, ofActionSuccessful, Select } from '@ngxs/store';
import { Login, LoginSuccess, AuthState } from 'src/app/store/auth';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { AlertService } from '../../shared/services/global/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  @Select(AuthState.getIsLoading) isLoading$: Observable<boolean>;

  private ngUnsubscribe = new Subject();

  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
  });

  constructor(private store: Store, private actions$: Actions, private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
    this.actions$
      .pipe(
        ofActionSuccessful(LoginSuccess),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(payload => {
        this.alertService.success(`Welcome ${payload.username}!`);
        this.router.navigate(['main']);
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onContinueClick() {
    this.store.dispatch(new Login());
  }
}
