import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { promise } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  resultlist:AngularFireList<any>;
  constructor(private firebase:AngularFireDatabase) { }

  getresult(){
    return this.resultlist=this.firebase.list('results'); 
  }

  createresult($keyperson,$keyaward)
  {
    var play="";
    var ref=firebase.database().ref("play");
      ref.limitToLast(1).on('child_added',function(data){//se obtiene el ultimo valor registrado para guardarlo en el resultado
        play=data.key;
      });
    this.resultlist.push({
      play:play,
      keyperson:$keyperson,
      keyaward:$keyaward

    });

  

  }

   restcant(keyaward)
  {
    console.log("editar"+keyaward)
    firebase.database().ref('award/' + keyaward).once('value').then(function(snap)
     {
      var cantold=snap.val().cant;
      var newcant=cantold-1;

      firebase.database().ref('award/' + keyaward).update(
        {
          cant:newcant
        });

     });

 
  }

  removeresult(keyplay)
  {
    var resultremove= this.firebase.list('results',ref => ref.orderByChild('play').equalTo(keyplay));   
    resultremove.remove();
   
  

  }

  

 


}
