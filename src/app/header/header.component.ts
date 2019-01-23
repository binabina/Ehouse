import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth: boolean;
  userEmail:string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user)=>{
        if (user){
          this.isAuth=true;
          this.userEmail=user.email;
        }else {
          this.isAuth=false;

        }
      }
    );
  }

  onSingOut(){
    this.authService.signOutUser();
  }

}
