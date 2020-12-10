const app = require("express")();
var admin = require("firebase-admin");

var serviceAccount = require("./blog-1a8fc-firebase-adminsdk-l15ep-0f305f00a3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://blog-1a8fc.firebaseio.com"
});

app.get('/setAdmin', async(req, res) => {
    admin.auth().setCustomUserClaims('T9Mbzum7Y6a9AdL4Wo32tIFIOF92', {
      type: 'administrator'
    }).then(() =>console.log('done'))
})

app.listen(4000, () => console.log('listening on port 4000'));