export class Appareil{
  description: string[];
  isOn: boolean;
  startTime:string;
  endTime: string;
  consumption: number;
  photo: string;
  constructor(public name: string){
    this.isOn=false;
    this.startTime='';
    this.endTime='';
    this.consumption=0;
    this.description=[];
  }
}
