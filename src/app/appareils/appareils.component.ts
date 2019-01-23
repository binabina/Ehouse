import {Component, OnDestroy, OnInit} from '@angular/core';
import {Appareil} from '../models/Appareil';
import {Subscription} from 'rxjs';
import {AppareilsService} from '../services/appareils.service';
import {Router} from '@angular/router';
import {ToastaService, ToastOptions, ToastData} from 'ngx-toasta';
import {Title} from '@angular/platform-browser';
@Component({
  selector: 'app-appareils',
  templateUrl: './appareils.component.html',
  styleUrls: ['./appareils.component.css']
})
export class AppareilsComponent implements OnInit, OnDestroy {

  h2Text='';
  appareils: Appareil[];
  appareilsSubscription: Subscription;
  isLoading:boolean=false;
  searchAppareil:string;
  p:number;
  constructor(private appareilService: AppareilsService,private router: Router, private toastaService:ToastaService, private title: Title) { }

  ngOnInit() {
    this.appareilsSubscription=this.appareilService.appareilsSubject.subscribe(
      (appareils: Appareil[])=>{
        this.isLoading=true;
        this.title.setTitle("E-house | Gestion de mes appareils domestiques");
        if (appareils.length>0){
          this.appareils=appareils;
          this.h2Text="Mes appareils";
        }else {
          this.appareils=[];
          this.h2Text="Vous n'avez pas d'appareils !";
        }
      }
    );
    this.appareilService.getAppareils();
    this.appareilService.emitAppareils();
  }
  onNewAppareil(){
    this.router.navigate(['/appareils','new']);
  }
  onStateAppareil(){
    this.router.navigate(['/appareils','state']);
  }
  onConfirmDelete(appareil: Appareil){
    if(confirm("Voulez-vous vraiment supprimer l'appareil "+appareil.name+ "?")) {
      this.onDeleteAppareil(appareil);
    }else {
      this.ngOnInit();
    }
  }
  onDeleteAppareil(appareil: Appareil){
    this.appareilService.removeAppareil(appareil);
    this.toastDeleteAppareil(appareil.name);
  }
  onViewAppareil(id: number){
    this.router.navigate(['/appareils','view', id]);
  }
  onUpdateAppareil(id: number){
    this.router.navigate(['/appareils','update', id]);
  }

  onSwitchOnAll(){
    this.appareilService.switchOnAll();
    this.toastOnAll();
  }
  onSwitchOffAll(){
    this.appareilService.switchOffAll();
    this.toastOffAll();
  }

  ngOnDestroy(){
    this.appareilsSubscription.unsubscribe();
  }
  toastOnAll(){
    var toastOptions:ToastOptions = {
      title: "Allumage",
      msg: "Tous vos appareils sont allumés!",
      showClose: true,
      timeout: 7000,
      theme: 'bootstrap'
    };
    this.toastaService.success(toastOptions);
  }
  toastOffAll(){
    var toastOptions:ToastOptions = {
      title: "Extinction",
      msg: "Tous vos appareils sont éteints!",
      showClose: true,
      timeout: 7000,
      theme: 'bootstrap'
    };
    this.toastaService.error(toastOptions);
  }
  toastDeleteAppareil(nom: string){
    var toastOptions:ToastOptions = {
      title: "Suppression",
      msg: "L'appareil "+nom+" a bien été supprimé! ",
      showClose: true,
      timeout: 7000,
      theme: 'bootstrap'
    };
    this.toastaService.error(toastOptions);
  }

}
