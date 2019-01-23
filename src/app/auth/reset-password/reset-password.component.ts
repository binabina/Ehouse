import {Component, OnInit, ɵConsole} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ToastaService, ToastOptions} from 'ngx-toasta';
import {Title} from '@angular/platform-browser';
import * as firebase from 'firebase';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;
  constructor(private  formBuilder: FormBuilder, private authService: AuthService, private  router: Router, private toastaService: ToastaService, private title: Title) {
    firebase.auth().onAuthStateChanged(
      (user)=>{
        if (user){
          router.navigate(['/appareils']);
        }
      }
    );
  }

  ngOnInit() {
    this.title.setTitle("E-house - Réinitialisation de mot de passe");
    this.initForm();
  }
  initForm(){
    this.signInForm=this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(){
    const email= this.signInForm.get('email').value;
    this.authService.resetUserPassword(email).then(
      ()=>{
        this.toastResetPassword(email);
        this.router.navigate(['/auth/signin']);
      }, (error)=>{
        this.errorMessage=error;
        console.log(error);
        this.toastResetPasswordKO(error);
      }
    );
  }

  toastResetPassword(email:string){
    var toastOptions:ToastOptions = {
      title: "Réinitialisation",
      msg: "Vous avez reçu un email à l'adresse "+email+" pour confirmer la réinitialisation de votre mot de passe.",
      showClose: true,
      timeout: 7000,
      theme: 'bootstrap'
    };
    this.toastaService.success(toastOptions);
  }
  toastResetPasswordKO(error: string){
    var toastOptions:ToastOptions = {
      title: "Erreur",
      msg: error,
      showClose: true,
      timeout: 7000,
      theme: 'bootstrap'
    };
    this.toastaService.error(toastOptions);
  }

}
