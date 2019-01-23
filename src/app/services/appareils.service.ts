import { Injectable } from '@angular/core';
import {Appareil} from '../models/Appareil';
import {Subject} from 'rxjs';
import {DatePipe} from '@angular/common';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AppareilsService {
  userId: string;
  appareils: Appareil[]=[];
  appareilsSubject= new Subject<Appareil[]>();
  constructor(private datePipe: DatePipe) {
    firebase.auth().onAuthStateChanged(
      (user)=>{
        if (user){
          this.userId=user.uid;
        }
      }
    );
  }

  emitAppareils(){
    this.appareilsSubject.next(this.appareils);
  }
  saveAppareils(){
    firebase.database().ref('/appareils/'+this.userId).set(this.appareils);
  }
  getAppareils(){
    firebase.database().ref('/appareils/'+this.userId)
      .on('value', (data)=>{
        this.appareils=data.val()? data.val(): [];
        this.emitAppareils();
      })
  }
  getSingleAppareil(id: number){
    return new Promise(
      (resolve, reject)=>{
        firebase.database().ref('/appareils/'+this.userId+'/'+id).once('value').then(
          (data)=>{
            resolve(data.val());
          }, (error)=>{
            reject(error);
          }
        );
      }
    );
  }
  createNewAppareil(newAppareil: Appareil){
    this.appareils.push(newAppareil);
    this.saveAppareils();
    this.emitAppareils();
  }

  updateAppareil(appareil: Appareil, index:number){
    this.appareils[index]=appareil;
    this.saveAppareils();
    this.emitAppareils();

  }
  removeAppareil(appareil: Appareil){
    if (appareil.photo){
      const storageRef= firebase.storage().refFromURL(appareil.photo);
      storageRef.delete().then(
        ()=>{
          console.log('Photo supprimée!');
        }
      ).catch(
        (error)=>{
          console.log('Fichier non trouvé :' +error);
        }
      );
    }
    const appareilIndexToRemove= this.appareils.findIndex(
      (appareilEl)=>{
        if (appareilEl===appareil){
          return true;
        }
      }
    );
    this.appareils.splice(appareilIndexToRemove, 1);
    this.saveAppareils();
    this.emitAppareils();


  }
  switchOnAll() {
    for(let appareil of this.appareils) {
      appareil.isOn=true;
    }
    this.saveAppareils();
    this.emitAppareils();
  }
  switchOffAll() {
    for(let appareil of this.appareils) {
      appareil.isOn=false;
    }
    this.saveAppareils();
    this.emitAppareils();
  }

  switchHours(appareil: Appareil){
    const now = this.datePipe.transform(new Date(), 'hh:mm');
    if (appareil.startTime<appareil.endTime) {
      if (appareil.startTime<=now && appareil.endTime>=now) {
        appareil.isOn=true;
      }else appareil.isOn=false;
    }else {
      if ((appareil.startTime<=now && '23:59'>=now)||('00:00'<=now && appareil.endTime>=now)){
        appareil.isOn=true;
      }else appareil.isOn=false;
    }
    
    
    return appareil;
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }

}
