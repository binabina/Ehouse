import { Component } from '@angular/core';

import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-house';
  constructor(){
    var config = {
      apiKey: "AIzaSyDNLSonMW2BzYYxTZ8HLp5y5iLVooWxqmc",
      authDomain: "e-house-234b2.firebaseapp.com",
      databaseURL: "https://e-house-234b2.firebaseio.com",
      projectId: "e-house-234b2",
      storageBucket: "e-house-234b2.appspot.com",
      messagingSenderId: "100400548054"
    };
    firebase.initializeApp(config);
  }
}
