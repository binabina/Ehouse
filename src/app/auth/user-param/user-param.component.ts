import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from '../../services/auth.service';
import {ToastaService, ToastOptions} from 'ngx-toasta';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-param',
  templateUrl: './user-param.component.html',
  styleUrls: ['./user-param.component.css']
})
export class UserParamComponent implements OnInit {

  changePasswordForm: FormGroup;
  userName:string;
  userEmail:string;
  errorMessage: string;
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private toastaService: ToastaService,private router: Router,private location: Location, private title: Title) { }

  ngOnInit() {
    this.title.setTitle("E-house - Mes paramètres")
    firebase.auth().onAuthStateChanged(
      (user)=>{
        if (user){
          this.userName=user.displayName;
          this.userEmail=user.email;
        }else {

        }
      }
    );

    this.initFormChangePassword();

  }

  initFormChangePassword(){
    this.changePasswordForm=this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      confirmpassword: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onChangeName(form: NgForm){
    const newName=form.value['newname'];
    this.userName=newName;
    this.authService.changeName(newName).then(
      ()=>{
        this.toastChangeName();
        this.router.navigate(['/user']);
      }, (error)=>{
        this.toastError(error);
      }
    );
  }
  onChangeEmail(form: NgForm){
    const newEmail=form.value['newemail'];
    this.userEmail=newEmail;
    this.authService.changeEmail(newEmail).then(
      ()=>{
        this.toastChangeEmail();
        this.authService.signOutUser();
      }, (error)=>{
        this.toastError(error);
      }
    );
  }

  onChangePassword(){
    const password= this.changePasswordForm.get('password').value;
    this.authService.changePassword(password).then(
      ()=>{
        this.toastChangePassword();
        this.router.navigate(['/user']);
      }, (error)=>{
        this.toastError(error);
      }
    );

  }

  onDeleteUser(){
    if(confirm("Voulez-vous vraiment supprimer votre profil ?")) {
      this.authService.deleleUser().then(
        ()=>{
          this.toastDeleteUser();
          this.authService.signOutUser();
        }, (error)=>{
          this.toastError(error);
        }
      );
    }else {
      this.ngOnInit();
    }
  }


  toastChangeName(){
    var toastOptions:ToastOptions = {
      title: "Modification",
      msg: "Votre nom a été bien modifié !",
      showClose: true,
      timeout: 7000,
      theme: 'bootstrap'
    };
    this.toastaService.success(toastOptions);
  }
  toastChangeEmail(){
    var toastOptions:ToastOptions = {
      title: "Modification",
      msg: "Votre mail a été bien modifié ! Veuillez vous connecter avec votre nouvel adresse mail.",
      showClose: true,
      timeout: 7000,
      theme: 'bootstrap'
    };
    this.toastaService.success(toastOptions);
  }
  toastChangePassword(){
    var toastOptions:ToastOptions = {
      title: "Modification",
      msg: "Votre mot de passe a été bien modifié !",
      showClose: true,
      timeout: 7000,
      theme: 'bootstrap'
    };
    this.toastaService.success(toastOptions);
  }
  toastDeleteUser(){
    var toastOptions:ToastOptions = {
      title: "Suppression",
      msg: "Votre compte a été bien supprilmé !",
      showClose: true,
      timeout: 7000,
      theme: 'bootstrap'
    };
    this.toastaService.success(toastOptions);
  }
  toastError(error: string){
    var toastOptions:ToastOptions = {
      title: "Erreur",
      msg: error,
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
