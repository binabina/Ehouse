import { Component, OnInit } from '@angular/core';
import {FormArray,FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppareilsService} from '../../services/appareils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Appareil} from '../../models/Appareil';
import {ToastaService, ToastOptions} from 'ngx-toasta';
import {Title} from '@angular/platform-browser';
import {Location} from '@angular/common';

@Component({
  selector: 'app-appareil-update',
  templateUrl: './appareil-update.component.html',
  styleUrls: ['./appareil-update.component.css']
})
export class AppareilUpdateComponent implements OnInit {

  appareilForm: FormGroup;
  appareil: Appareil;
  id:number;
  fileIsUploading= false;
  fileUrl: string;
  fileUploaded=false;

  constructor(private formBuilder: FormBuilder, private appareilService: AppareilsService,private router: Router, private location: Location, private route: ActivatedRoute, private toastaService: ToastaService, private title: Title) {}

  ngOnInit() {
    this.appareil=new Appareil('');
    this.id=this.route.snapshot.params['id'];
    this.appareilService.getSingleAppareil(+this.id).then(
      (appareil: Appareil)=>{
        this.title.setTitle("E-house - Modification de l'appareil "+appareil.name);
        this.appareilForm=this.formBuilder.group({
          name:[appareil.name, Validators.required],
          consumption:[appareil.consumption, Validators.required],
          description: this.formBuilder.array(appareil.description)

        });
        this.appareil=appareil;
      }
    );

  }
  getDescriptionArray(){
    return this.appareilForm.get('description') as FormArray;
  }
  onAddDescription(){
    let newControl= this.formBuilder.control('');
    this.getDescriptionArray().controls.push(newControl);
  }
  onRemoveDescription(index: number){
    this.getDescriptionArray().removeAt(index);
  }


  onUpdateAppareil(){
    let updateAppareil= new Appareil(this.appareilForm.get('name').value);
    updateAppareil.consumption=this.appareilForm.get('consumption').value;
    for(let control of this.getDescriptionArray().controls){
      updateAppareil.description.push(control.value);
    }
    updateAppareil.isOn=this.appareil.isOn;
    updateAppareil.startTime=this.appareil.startTime;
    updateAppareil.endTime=this.appareil.endTime;
    //updateAppareil.photo=this.appareil.photo;
    if (this.appareil.photo && this.appareil.photo!=='') {
      updateAppareil.photo=this.appareil.photo;
    }
    if (this.fileUrl && this.fileUrl!==''){
      updateAppareil.photo=this.fileUrl;
    }
    this.appareilService.updateAppareil(updateAppareil,this.id);
    this.toastUpdateAppareil();
    this.router.navigate(['/appareils']);
  }
  onUploadFile(file: File){
    this.fileIsUploading=true;
    this.appareilService.uploadFile(file)
      .then(
        (url:string)=>{
          this.fileUrl=url;
          this.fileIsUploading=false;
          this.fileUploaded=true;
        }
      );
  }

  onViewAppareil(id: number){
    this.router.navigate(['/appareils','view', id]);
  }

  detectFile(event){
    this.onUploadFile(event.target.files[0]);
  }

  toastUpdateAppareil(){
    var toastOptions:ToastOptions = {
      title: "Modification",
      msg: "L'appareil a été bien modifié!",
      showClose: true,
      timeout: 7000,
      theme: 'bootstrap'
    };
    this.toastaService.success(toastOptions);
  }

  onBack(){
    this.location.back();
  }

}
