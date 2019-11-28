import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database';
import * as firebase from 'firebase/app';
import {Play} from '../model/Play';




@Injectable({
  providedIn: 'root'
})
export class PlayService {

  playlist:AngularFireList<any>;
  
  constructor(private firebase:AngularFireDatabase) {

       

   }

  //retonar los sorteos
  getplay()
  {
    return this.playlist=this.firebase.list('play'); 
  }

   //permite crear un sorteo
   Create(play:Play)
   {
   
     this.playlist.push({
       nombre:play.nombre   
       
     });
   }
 
   //elimina sorteo
   remove($key:string)
   {
     
      this.playlist.remove($key);
     
     
   }
   
 
  
  

  
}
