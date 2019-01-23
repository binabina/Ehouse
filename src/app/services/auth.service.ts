import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  createNewUser(email: string, password: string){
    firebase.auth().useDeviceLanguage();
    return new Promise(
      (resolve, reject)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password).then(
          ()=>{
            resolve();
          }, (error)=>{
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string){
    firebase.auth().useDeviceLanguage();
    return new Promise(
      (resolve, reject)=>{
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          ()=>{
            resolve();
          }, (error)=>{
            reject(error);
          }
        );
      }
    );
  }
  changeName(name: string){
    firebase.auth().useDeviceLanguage();
    return new Promise(
      (resolve, reject)=>{
        firebase.auth().currentUser.updateProfile({displayName: name, photoURL:''}).then(
          ()=>{
            resolve();
          },(error)=>{
            reject(error);
        }
        )
      }
    );
  }
  changeEmail(email: string){
    firebase.auth().useDeviceLanguage();
    return new Promise(
      (resolve, reject)=>{
        firebase.auth().currentUser.updateEmail(email).then(
          ()=>{
            resolve();
          },(error)=>{
            reject(error);
          }
        )
      }
    );
  }
  changePassword(password: string){
    firebase.auth().useDeviceLanguage();
    return new Promise(
      (resolve, reject)=>{
        firebase.auth().currentUser.updatePassword(password).then(
          ()=>{
            resolve();
          },(error)=>{
            reject(error);
          }
        )
      }
    );
  }
  deleleUser(){
    firebase.auth().useDeviceLanguage();
    return new Promise(
      (resolve, reject)=>{
        firebase.auth().currentUser.delete().then(
          ()=>{
            resolve();
          },(error)=>{
            reject(error);
          }
        )
      }
    );
  }


  resetUserPassword(email: string){
    firebase.auth().useDeviceLanguage();
    return new Promise(
      (resolve, reject)=>{
        firebase.auth().sendPasswordResetEmail(email).then(
          ()=>{
            resolve();
          }, (error)=>{
            reject(error);
          }
        );
      }
    );
  }


  signOutUser(){
    firebase.auth().signOut();
  }
}
