import { Component, OnInit } from '@angular/core';
import {Appareil} from '../../models/Appareil';
import {ActivatedRoute, Router} from '@angular/router';
import {AppareilsService} from '../../services/appareils.service';
import {NgForm} from '@angular/forms';
import {ToastaService, ToastOptions} from 'ngx-toasta';
import {Title} from '@angular/platform-browser';
import {Location} from '@angular/common';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.css']
})
export class SingleAppareilComponent implements OnInit {

  appareil: Appareil;
  id:number;

  constructor(private  route: ActivatedRoute,private router: Router, private appareilsService: AppareilsService,private location: Location, private toastaService:ToastaService, private title: Title) { }

  ngOnInit() {
    this.appareil=new Appareil('');
    this.id=this.route.snapshot.params['id'];
    this.appareilsService.getSingleAppareil(+this.id).then(
      (appareil: Appareil)=>{
        this.title.setTitle("E-house - Gestion de l'appareil "+appareil.name);
        this.appareil=appareil;
      }
    );
  }
  onToogleAppareil(){
    this.appareil.isOn= !this.appareil.isOn;
    this.appareilsService.updateAppareil(this.appareil,this.id);
    if (this.appareil.isOn===true){
      this.toastOn();
    } else this.toastOff();
  }
  onSubmitForm(form: NgForm){
    this.appareil.startTime=form.value['startTime'];
    this.appareil.endTime=form.value['endTime'];
    this.appareil=this.appareilsService.switchHours(this.appareil);
    this.appareilsService.updateAppareil(this.appareil,this.id);
    this.toastSaveHours();
  }
  onDeleteHours(){
    this.appareil.startTime='';
    this.appareil.endTime='';
    this.appareilsService.updateAppareil(this.appareil,this.id);
    this.toastDeleteHours();
  }
  onUpdateAppareil(id: number){
    this.router.navigate(['/appareils','update', id]);
  }
  toastOn(){
    var toastOptions:ToastOptions = {
      title: "Allumage",
      msg: "L'appareil est allumé!",
      showClose: true,
      timeout: 7000,
      theme: 'bootstrap'
    };
    this.toastaService.success(toastOptions);
  }
  toastOff(){
    var toastOptions:ToastOptions = {
      title: "Extinction",
      msg: "L'appareil est éteint!",
      showClose: true,
      timeout: 7000,
      theme: 'bootstrap'
    };
    this.toastaService.error(toastOptions);
  }
  toastSaveHours(){
    var toastOptions:ToastOptions = {
      title: "Enregistrement",
      msg: "Les horaires ont été bien enregistré!",
      showClose: true,
      timeout: 7000,
      theme: 'bootstrap'
    };
    this.toastaService.success(toastOptions);
  }
  toastDeleteHours(){
    var toastOptions:ToastOptions = {
      title: "Suppression",
      msg: "Les horaires ont été bien supprimé!",
      showClose: true,
      timeout: 7000,
      theme: 'bootstrap'
    };
    this.toastaService.error(toastOptions);
  }

  onBack(){
    this.location.back();
  }

}
