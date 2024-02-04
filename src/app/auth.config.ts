import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'http://localhost:8080',
  redirectUri: 'http://localhost:4200',
  clientId: 'public-client',
  responseType: 'code',
  scope: 'openid profile read write',
  showDebugInformation: true,
  loginUrl: 'http://localhost:8080/login/oauth2/public-client',
  oidc: true,
};