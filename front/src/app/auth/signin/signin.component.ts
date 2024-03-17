import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { exhaustMap, map, Subscription, take } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  form: FormGroup;

  private signInSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      "username": new FormControl(null, [Validators.required]),
      "password": new FormControl(null, [Validators.required]),
    });

    this.signInSub = this.authService.signIn$
      .pipe(exhaustMap(({username, password}) => {
        return this.authService.signIn(username, password);
      }))
      .subscribe({
        next: (response) => {
          this.router.navigate(['/vehicles']);
        },
        error: (err) => console.log(`Error occurred: `, err),
      });

      this.authService.user$.pipe(
          take(1),
          map((user) => !!user))
        .subscribe({
          next: (isSignedIn) => {
            if(isSignedIn) {
              this.router.navigate(['/vehicles'])
            }
          },
          error: (err) => console.log('Something went wrong')
        });
  }

  ngOnDestroy(): void {
    this.signInSub.unsubscribe();
  }

  onSubmit() {
    if(this.form.valid) {
      this.authService.signInTrigger(this.form.value.username, this.form.value.password);
    }
  }
}
