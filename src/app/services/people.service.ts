import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database';
import {People}  from '../model/People';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  peoplelist:AngularFireList<any>;
  constructor(private firebase:AngularFireDatabase) {
    this.getpeople();
   }

  //retorna los participantes almacenados en base de datos
  getpeople()
  {
    return this.peoplelist=this.firebase.list('people'); 
  }

  //permite crear un participante
  Create(people:People)
  {
  
    this.peoplelist.push({
      tipodoc:people.tipodoc,
      doc:people.doc,
      nombre:people.nombre,
      apellidos:people.apellidos,
      fechanac:people.fechanac     
      
    });
  }

  //elimina participante
  remove($key:string)
  {
    this.peoplelist.remove($key);
  }

  //edita participante
  edit(people:People,key)
  {
  
   firebase.database().ref('people/' + key).update({
    tipodoc:people.tipodoc,
    doc:people.doc,
    nombre:people.nombre,
    apellidos:people.apellidos,
    fechanac:people.fechanac   

   })
   
  }

  //Revisa si el usuario existe en base de datos
  checkuser(doc)
  {
    /* 1-Existe
       0-No existe*/ 
     var resultremove= this.firebase.list('people',ref => ref.orderByChild('doc').equalTo(doc));
       
      if(resultremove)
      {
        return "1";
      }
      else
      {
        return "0";
      }
    
  
    
  }
}


