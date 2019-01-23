import { Component, OnInit } from '@angular/core';
import {FormArray,FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppareilsService} from '../../services/appareils.service';
import {Router} from '@angular/router';
import {Appareil} from '../../models/Appareil';
import {ToastaService, ToastOptions} from 'ngx-toasta';
import {Title} from '@angular/platform-browser';
import {Location} from '@angular/common';

@Component({
  selector: 'app-appareil-form',
  templateUrl: './appareil-form.component.html',
  styleUrls: ['./appareil-form.component.css']
})
export class AppareilFormComponent implements OnInit {

  appareilForm: FormGroup;
  fileIsUploading= false;
  fileUrl: string;
  fileUploaded=false;

  constructor(private formBuilder: FormBuilder, private appareilService: AppareilsService, private router: Router,private location: Location, private toastaService:ToastaService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle("E-house - Aujout d'un nouvel appareil");
    this.initForm();
  }
  initForm(){
    this.appareilForm=this.formBuilder.group({
      name:['', Validators.required],
      consumption:['', Validators.required],
      description: this.formBuilder.array([''])
    })
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




  onSaveAppareil(){
    let newAppareil= new Appareil(this.appareilForm.get('name').value);
    newAppareil.consumption=this.appareilForm.get('consumption').value;
    for(let control of this.getDescriptionArray().controls){
      newAppareil.description.push(control.value);
    }

    if (this.fileUrl && this.fileUrl!==''){
      newAppareil.photo=this.fileUrl;
    }
    this.appareilService.createNewAppareil(newAppareil);
    this.toastSaveAppareil();
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

  detectFile(event){
    this.onUploadFile(event.target.files[0]);
  }

  toastSaveAppareil(){
    var toastOptions:ToastOptions = {
      title: "Enregistrement",
      msg: "L'appareil a été bien enregistré!",
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
