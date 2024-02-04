import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';
import { filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'service-provider-pkce-client';

  constructor(private oauthService: OAuthService, private http: HttpClient) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((_) => this.oauthService.loadUserProfile());
  }

  authenticate() {
    this.oauthService.initLoginFlow();
  }

  get userName(): string | null {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['given_name'];
  }

  get idToken(): string {
    return this.oauthService.getIdToken();
  }

  get accessToken(): string {
    return this.oauthService.getAccessToken();
  }

  logout() {
    this.oauthService.logOut();
  }

  callApi() {
    this.http.get('http://localhost:8081/foos', {
      headers: {
        Authorization: 'Bearer ' + this.accessToken
      }
    }).subscribe((data) => {
      console.log(data);
    });
  }
}
