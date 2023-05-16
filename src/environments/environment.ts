// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    projectId: 'ng-fittnes-trackerr',
    appId: '1:102872956598:web:aa2540ace9da5a71043017',
    databaseURL: 'https://ng-fittnes-trackerr-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'ng-fittnes-trackerr.appspot.com',
    apiKey: 'AIzaSyBamKhYOsTA4_lKnR8fLRJqdXQrBLNzO7s',
    authDomain: 'ng-fittnes-trackerr.firebaseapp.com',
    messagingSenderId: '102872956598',
    measurementId: 'G-DL6XM4ZQDG',
  }
};
