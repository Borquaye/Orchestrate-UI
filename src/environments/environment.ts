// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAUg6NAnUAHLUG1Lv9c8QpWe4UfCxTABIY',
    authDomain: 'meetinganalasys.firebaseapp.com',
    databaseURL: 'https://meetinganalasys.firebaseio.com',
    projectId: 'meetinganalasys',
    storageBucket: 'meetinganalasys.appspot.com',
    messagingSenderId: '644065881234'
  }
};
