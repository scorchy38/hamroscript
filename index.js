const express = require("express");
const firebase = require("firebase/app");
const fs = require("fs"),
  request = require("request");
const firebaseFirestore = require("firebase/firestore");

var app = express();

var firebaseConfig = {
  apiKey: "AIzaSyAZx2NOLHStzW8he0SwqNOHsKmlJTdX0Lw",
  authDomain: "backuphg2-26227.firebaseapp.com",
  projectId: "backuphg2-26227",
  storageBucket: "backuphg2-26227.appspot.com",
  messagingSenderId: "199289146939",
  appId: "1:199289146939:web:b157c36ddcaecc5fb6561e",
  measurementId: "G-B4HHMXLCM8",
};

firebase.initializeApp(firebaseConfig);

var download = function (uri, filename, callback, id) {
  request.head(uri, function (err, res, body) {
    request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
  });
};

var db = firebase.firestore();
var i;
db.collection("Products")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      fs.mkdir("hamrogadgets/" + doc.id, (resp) => {});
      for (i = 0; i < doc.data()["imageURLs"].length; i++) {
        download(
          doc.data()["imageURLs"][0],
          "hamrogadgets/" + doc.id + "/" + "image" + i + ".png",
          function (err) {
            if (err instanceof Error) {
              console.log(err);
            } else {
              console.log("done");
            }
          },
          doc.id
        );
      }
    });
  });

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log("Script listening on port 3000!");
});
