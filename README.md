# angular-google-signin

Google Sign-In component for Angular written in TypeScript.

## Usage

Add this script tag below in the head tag of ```index.html```:

```html
<script defer src="https://apis.google.com/js/platform.js"></script>
```

Import and add ```GoogleSignInComponent``` from this package to your Angular module:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {GoogleSignInComponent} from 'angular-google-signin';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    GoogleSignInComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Example of a component that is using this package:

```typescript
import {Component} from '@angular/core';
import {GoogleSignInSuccess} from 'angular-google-signin';

import GoogleUser = gapi.auth2.GoogleUser;
import BasicProfile = gapi.auth2.BasicProfile;

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor() {
  }

  private myClientId: string = 'your-client-id-here.apps.googleusercontent.com';

  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    let googleUser: GoogleUser = event.googleUser;
    let id: string = googleUser.getId();
    let profile: BasicProfile = googleUser.getBasicProfile();
    console.log('ID: ' +
      profile
        .getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
  }
}
```

In a component template, put `<google-signin>` with attributes of render options and init params.
`clientId` attribute is **required**. You don't need to write `google-signin-client_id` meta tag.

```html
<google-signin
  [clientId]="myClientId"
  [width]="myWidth"
  [theme]="myTheme"
  [scope]="myScope"
  [longTitle]="myLongTitle"
  (googleSignInSuccess)="onGoogleSignInSuccess($event)">
</google-signin>
```

For more information about Google Sign-In JavaScript client, See [https://developers.google.com/identity/sign-in/web/sign-in](https://developers.google.com/identity/sign-in/web/sign-in)

## Features and bugs

Please file feature requests and bugs at the [issue tracker][tracker].

[tracker]: https://github.com/miltador/angular-google-signin/issues

## Notes

This package is a modification and rewriting of original work by @ntaoo [https://github.com/ntaoo/ng2_g_signin/](https://github.com/ntaoo/ng2_g_signin).

Thanks @ntaoo for an idea and a component design 👍
