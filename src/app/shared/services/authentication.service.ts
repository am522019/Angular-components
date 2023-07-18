import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { SdkService } from './sdk.service';
export interface Credentials {
  user: any;
  token: string;
}
const credentialsKey = 'credentials';

@Injectable()
export class AuthenticationService {
  private _credentials: Credentials | null | undefined;

  constructor(private sdkService: SdkService) {
    const savedCredentials = localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      if (savedCredentials && savedCredentials !== 'undefined') {
        this._credentials = JSON.parse(savedCredentials);
        this.sdkService.setToken(this.credentials.token);
      }
    }
  }

  async login(context: LoginDTO): Promise<Credentials> {
    const { username, password } = context;

    const creds = await this.sdkService.login(username, password);

    this.setCredentials(creds);

    return creds;
  }

  oAuthLogin(context: OAuthContext, network: SocialNetworkName): Observable<Credentials> {
    return from(this.sdkService.socialLogin(network, context)).pipe(
      map((user: Credentials) => {
        this.setCredentials(user);
        return user;
      })
    );
  }

  oAuthRegistration(socialUserInfo: SocialNetworkRegistrationDTO, network: SocialNetworkName): Observable<Credentials> {
    return from(this.sdkService.socialRegistration(socialUserInfo, network)).pipe(
      map((user: Credentials) => {
        this.setCredentials(user);
        return user;
      })
    );
  }

  forgotPassword(username: string): Observable<boolean> {
    const data = {
      email: username
    };

    return from(this.sdkService.resetPassword(data)).pipe(map(() => true));
  }

  logout(): Observable<boolean> {
    this.sdkService.setToken(this.credentials.token);
    return from(this.sdkService.logout()).pipe(
      map(() => {
        this.setCredentials();
        return true;
      })
    );
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  get credentials(): Credentials | null {
    return this._credentials;
  }

  get currentUserId(): string | null {
    return this._credentials && this._credentials.user ? this._credentials.user._id : null;
  }

  get isAgribusiness(): boolean {
    return this.credentials.user.roles.includes(Role.AGRIBUSINESS);
  }



  setCredentials(credentials?: Credentials) {
    this._credentials = credentials || null;
    const autocomplete = localStorage.getItem('autocomplete');
    localStorage.clear(); // removes everything, it includes the currentPage in the different lists
    if (autocomplete && autocomplete !== 'undefined') {
      localStorage.setItem('autocomplete', autocomplete);
    } else {
      const defaultAutoComplete: Autocomplete = {
        grnType: ['Goods Received', 'Purchase order'],
        saleType: ['Proforma invoice', 'Goods delivered'],

        productQuality: [],
        productNames: []
      };
      localStorage.setItem('autocomplete', JSON.stringify(defaultAutoComplete));
    }
    if (credentials?.token) {
      this.sdkService.setToken(credentials.token);
    }
    if (credentials) {
      localStorage.setItem(credentialsKey, JSON.stringify(credentials));
    }
  }
  getCurrentUserRequest(): Promise<any> {
    return this.sdkService.getCurrentUser();
  }
}
