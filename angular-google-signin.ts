import {Component, AfterViewInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

export class GoogleSignInSuccess {
  public googleUser: gapi.auth2.GoogleUser;

  constructor(googleUser: gapi.auth2.GoogleUser) {
    this.googleUser = googleUser;
  }
}

export class GoogleSignInFailure {
}

@Component({
  selector: 'google-signin',
  template: '<div [id]="id"></div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleSignInComponent implements AfterViewInit {
  private id: string = 'google-signin2';

  // Render options
  @Input() private scope: string;

  private _width: number;

  get width(): string {
    return this._width.toString();
  }

  @Input() set width(value: string) {
    this._width = Number(value);
  }

  private _height: number;

  get height(): string {
    return this._height.toString();
  }

  @Input() set height(value: string) {
    this._height = Number(value);
    gapi.load('', '');
  }

  private _longTitle: boolean;

  get longTitle(): string {
    return this._longTitle.toString();
  }

  @Input() set longTitle(value: string) {
    this._longTitle = Boolean(value);
  }

  @Input() private theme: string;

  // Init params
  @Input() private clientId: string;
  @Input() private cookiePolicy: string;

  private _fetchBasicProfile: boolean;

  get fetchBasicProfile(): string {
    return this._fetchBasicProfile.toString();
  }

  @Input() set fetchBasicProfile(s: string) {
    this._fetchBasicProfile = Boolean(s);
  }

  @Input() private hostedDomain: string;
  @Input() private openidRealm: string;

  @Output() googleSignInSuccess: EventEmitter<GoogleSignInSuccess> = new EventEmitter<GoogleSignInSuccess>();

  @Output() googleSignInFailure: EventEmitter<GoogleSignInFailure> = new EventEmitter<GoogleSignInFailure>();

  ngAfterViewInit() {
    this.auth2Init();
    this.renderButton();
  }

  private auth2Init() {
    if (this.clientId == null)
      throw new Error(
        'clientId property is necessary. (<google-signin clientId="..."></google-signin>)');

    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: this.clientId,
        cookie_policy: this.cookiePolicy,
        fetch_basic_profile: this._fetchBasicProfile,
        hosted_domain: this.hostedDomain,
        openid_realm: this.openidRealm
      });
    });
  }

  private handleFailure() {
    this.googleSignInFailure.next(new GoogleSignInFailure());
  }

  private handleSuccess(googleUser: gapi.auth2.GoogleUser) {
    this.googleSignInSuccess.next(new GoogleSignInSuccess(googleUser));
  }

  private renderButton() {
    gapi.signin2.render(
      this.id, {
        scope: this.scope,
        width: this._width,
        height: this._height,
        longtitle: this._longTitle,
        theme: this.theme,
        onsuccess: (googleUser: gapi.auth2.GoogleUser) => this.handleSuccess(googleUser),
        onfailure: () => this.handleFailure()
      });
  }
}
