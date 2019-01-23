import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Appareil} from '../models/Appareil';

@Pipe({
  name: 'filter'
})
@Injectable({
  providedIn: 'root'
})
export class FilterPipeService implements PipeTransform {

  constructor() { }

  transform(appareils: Appareil[], field: string, value: string): any[] {
    if (!appareils) {
      return [];
    }
    if (!field || !value) {
      return appareils;
    }
    return appareils.filter(appareil =>
      appareil[field].normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase())
    );

  }
}
