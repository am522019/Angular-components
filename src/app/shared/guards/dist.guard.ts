import { NavController } from '@ionic/angular';
import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClevertapService } from '@shared/services/clevertap.service';

@Injectable({
  providedIn: 'root'
})
export class DistAuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private storageService: StorageService,
    private nav: NavController,
    private clevertapService: ClevertapService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuth();
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkAuth();
  }
  private checkAuth() {
    return from(this.storageService.get('credentials')).pipe(
      map((res) => {
        if (res && res?.user?.policyRole?.name === 'distributor') {
          const distributor = res?.user?.distributor;
          if (distributor.status === 'new') {
            if (distributor.documents?.length) {
              this.nav.navigateForward('/distributor-wallet/upload-docs');
            } else {
              this.nav.navigateForward('/distributor-wallet/status');
            }
          } else {
            this.nav.navigateBack('/distributor-wallet');
          }
        }
        return true;
      })
    );
  }
}
