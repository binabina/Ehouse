import { Component, OnInit } from '@angular/core';
import {ChartErrorEvent, ChartEvent} from 'angular-google-charts';
import {Appareil} from '../../models/Appareil';
import {Subscription} from 'rxjs';
import {AppareilsService} from '../../services/appareils.service';
import {Title} from '@angular/platform-browser';
import {Location} from '@angular/common';

@Component({
  selector: 'app-state-appareil',
  templateUrl: './state-appareil.component.html',
  styleUrls: ['./state-appareil.component.css']
})
export class StateAppareilComponent implements OnInit {
  h2Text='';
  appareils: Appareil[];
  appareilsSubscription: Subscription;
  chart: any;
  isLoading: boolean= false;

  constructor(private appareilService: AppareilsService,private location: Location, private title: Title) {}

  ngOnInit() {
    this.appareilsSubscription=this.appareilService.appareilsSubject.subscribe(
      (appareils: Appareil[])=>{
        this.isLoading=true;
        this.title.setTitle("E-house - Statistiques de mes appareils");
        let appareilsData: Array<Array<string | number | {}>> =[];
        for (let apparel of appareils){
          appareilsData.push([apparel.name,apparel.consumption])
        }
        this.chart={
          title: 'Courbe de suivi de mes consommations',
          type: 'PieChart',
          columnNames: ['', ''],
          data: appareilsData,
          roles: [],
          options:{
            is3D: true,
            chartArea: {'width': '100%', 'height': '80%'},
            legend: {'position': 'bottom'},
            titleTextStyle:{color: 'black', fontSize: 25}
          }
        };
        if (appareils.length>0){
          this.appareils=appareils;
          this.h2Text="Statistiques consommation de mes appareils";
        }else {
          this.appareils=[];
          this.h2Text="Vous n'avez pas encore enregistré d'appareils";
        }

      }
    );
    this.appareilService.getAppareils();
    this.appareilService.emitAppareils();
  }

  onReady() {
    console.log('Chart ready');
  }

  onError(error: ChartErrorEvent) {
    console.error('Error: ' + error.message.toString());
  }

  onSelect(event: ChartEvent) {
    console.log('Selected: ' + event.toString());
  }

  onMouseEnter(event: ChartEvent) {
    console.log('Hovering ' + event.toString());
  }

  onMouseLeave(event: ChartEvent) {
    console.log('No longer hovering ' + event.toString());
  }
  onBack(){
    this.location.back();
  }



}
