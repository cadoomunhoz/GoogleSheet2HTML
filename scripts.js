function initClient() {
  var API_KEY = 'AIzaSyAiHuUX-twj5zM-urH9lBXL9jS66zm6G6U';  // TODO: Update placeholder with desired API key.
  var CLIENT_ID = '298187606990-ntd1uma9v2u0r7b4nikffufritkv714c.apps.googleusercontent.com';  // TODO: Update placeholder with desired client ID.
  var SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

  gapi.client.init({
    'apiKey': API_KEY,
    'clientId': CLIENT_ID,
    'scope': SCOPE,
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function() {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
    updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
    read_data();
  }
}

function handleSignInClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

function read_data() {
  var params = {
    spreadsheetId: '1Cf655I3xsAsGBA4KcapdSwPYRWvs5ptOlRiYB9yPm-Q',  // TODO: Update placeholder value.
    range: 'Total!C2',  // TODO: Update placeholder value.
  };

  var request = gapi.client.sheets.spreadsheets.values.get(params);
  request.then(function(response) {
    console.log(response.result);
    populateSheet(response.result);
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });
}

function populateSheet(result) {
  for(var row=0; row<2; row++) {1
    for(var col=0; col<1; col++) {
    document.getElementById(row+":"+col).value = result.values[row][col];
    }
  }
}
