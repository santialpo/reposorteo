import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
require('firebase/auth');
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  app:firebase.app.App;
  constructor(private router:Router,private toast:ToastrService) { 
  this.app=firebase.initializeApp(environment.firebase);
  }

  login(email:string,password:string)
  {
      
    firebase.auth().signInWithEmailAndPassword(email,password)   
     .then(
         
       response=>{                
        this.router.navigate(['/Home']);
       
   
      }
      
     )      
     .catch(   
       
      error=>this.error(error.code)
        
     );
  }

  error(error)
  {
   
    switch(error) { 
      case "auth/wrong-password": { 
        this.toast.error("La contraseña ingresada es incorrecta");
         break; 
      } 
      case "auth/user-not-found": { 
        this.toast.error("El usuario ingresado no existe");
         break; 
      } 
      case "auth/invalid-email":
      {
        this.toast.error("El email que ingresó no es valido");
         break; 
      }
     
      default: { 
        this.toast.error("Hubo un problema, intente nuevamente");
       
        this.router.navigate(['/Home']);
         break; 
      } 
   }
    

  }

  isAuthenticaded()
  {
    const user=firebase.auth().currentUser;
    
    if(user)
    {
     
      return true;
    }
    else
    {
      
      return false;
    }
  }

  logout()
  {
   
    firebase.auth().signOut();   
    this.router.navigate(['/Home']);
  }
}
