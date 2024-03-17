import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { enviroment } from "src/environments/environment";
import { User } from "./User.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = enviroment.apiUrl;
  private signInEndpointUrl = enviroment.signInUrl;
  private signInSub = new Subject<{ username: string; password: string; }>();
  private userSub = new BehaviorSubject<User>(null);
  private sessionStorageUserKey = 'user';
  private autoSignOutTimeout;

  signIn$ = this.signInSub.asObservable();
  user$ = this.userSub.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.autoSignIn();
  }

  signInTrigger(username: string, password: string): void {
    this.signInSub.next({ username, password });
  }

  signOut() {
    this.userSub.next(null);
    this.clearUserDataFromStorage();
    this.router.navigate(['/sign-in']);

    if(this.autoSignOutTimeout) {
      clearTimeout(this.autoSignOutTimeout);
    }
  }

  signIn(username: string, password: string): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.apiUrl}${this.signInEndpointUrl}`, {
      username,
      password,
    }).pipe(
      tap((resp: SignInResponse) => {
        this.handleAuth(resp);
      }
    ))
  }

  private handleAuth(authResp: SignInResponse) {
    const user: User = {
      username: authResp.username,
      id: authResp.id,
      authToken: authResp.authToken,
      expiresOn: new Date(authResp.expiresOn),
      issuedAt: new Date(authResp.issuedAt),
    };
    this.setAutoSignOut(new Date(authResp.expiresOn).getTime() - Date.now())
    this.userSub.next(user);
    sessionStorage.setItem(this.sessionStorageUserKey, JSON.stringify(user));
  }

  private autoSignIn() {
    const userData = sessionStorage.getItem(this.sessionStorageUserKey);
    if (!userData) return;
    const parsedUserData = JSON.parse(userData);
    const user: User = {
      ...parsedUserData,
      expiresOn: new Date(parsedUserData.expiresOn),
      issuedAt: new Date(parsedUserData.issuedAt)
    };

    if(user.expiresOn > new Date()) {
      this.setAutoSignOut(user.expiresOn.getTime() - Date.now())
      this.userSub.next(user);
    }
  }

  private setAutoSignOut(expireDuration: number) { // expireDuration in milliseconds
    this.autoSignOutTimeout = setTimeout(() => {
      this.userSub.next(null);
      this.clearUserDataFromStorage();
    }, expireDuration)
  }

  private clearUserDataFromStorage() {
    sessionStorage.removeItem(this.sessionStorageUserKey);
  }
}

export interface SignInResponse {
  id: string;
  username: string;
  authToken: string;
  expiresOn: Date;
  issuedAt: Date;
}
