import { Injectable } from '@angular/core';
import {Award} from '../model/Award';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AwardService {

  constructor(private firebase:AngularFireDatabase) {

    this.getawards();
   }
  awardlist:AngularFireList<any>;

  //obtener los premios de base de datos
  getawards()
  {
    return this.awardlist=this.firebase.list('award'); 
  }

    //permite crear un premio
    Create(award:Award)
    {
    
      this.awardlist.push({
        cod:award.cod,
        desc:award.desc,
        cant:award.cant    
        
      });
    }

     //elimina premio
  remove($key:string)
  {
    this.awardlist.remove($key);
  }

  //edita premio
  edit(award:Award,key)
  {
   
    firebase.database().ref('award/' + key).update({
      cod:award.cod,
      desc:award.desc,
      cant:award.cant  

   })
   
  }

  updatecant(key,cant)
  {
    firebase.database().ref('award/' + key).update({
      cant:cant  

   })

  }
}
