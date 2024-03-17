import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";

import { AuthService } from "../auth/auth.service";

type CanActivateReturnType = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

export const canActivateProtectedRoute: CanActivateFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CanActivateReturnType => {
  const router = inject(Router);
  return inject(AuthService).user$.pipe(
    take(1),
    map(user => {
      const isAuthenticated = !!user;
      return isAuthenticated ? true : router.createUrlTree((['/sign-in']));
    }));
}
