import { Injectable } from '@angular/core';
import { ApiService } from '@my/sdk';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SdkService extends ApiService {
  constructor() {
    super(environment.api_url, environment.new_api_url);
  }
}
