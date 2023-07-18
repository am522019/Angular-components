import { SdkService } from '@shared/services/sdk.service';
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
export class TokenSetterGuard implements CanActivate, CanActivateChild {
  constructor(
    private storageService: StorageService,
    private nav: NavController,
    private clevertapService: ClevertapService,
    private router: Router,
    private sdkService: SdkService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.setToken();
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.setToken();
  }
  private async setToken() {
    await this.storageService.ready();
    const creds = await this.storageService.get('credentials');
    if (creds?.token) {
      const { token } = creds;
      this.sdkService.setToken(token);
    }
    return true;
  }
}
