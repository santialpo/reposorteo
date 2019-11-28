import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {PlayService} from '../services/play.service';
import {ToastrService} from 'ngx-toastr';
import { AngularFireList} from '@angular/fire/database';
import { Play } from '../model/Play';
import {ResultsService} from '../services/results.service';
import { Award } from '../model/Award';
import { People } from '../model/People';
import {PeopleService} from '../services/people.service';
import {AwardService} from '../services/award.service';
import * as firebase from 'firebase/app';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  nombre="";
  playlist:AngularFireList<any>;
  listaresultado: any[]=[];
  peoplelist:AngularFireList<any>;
  awardlist:AngularFireList<any>;
  listaward: any[]=[];
  listpeople: any[]=[];
  p: number = 1;
  constructor(private playservice:PlayService,private toast:ToastrService,private resultservice:ResultsService,
    private peopleservice:PeopleService,private awardservice:AwardService,private modal:NgbModal) { }

  ngOnInit() {

    this.refreshaward();
    this.resultservice.getresult();
    //Listo la lista de sorteos
    this.playlist=this.playservice.getplay();
    this.playlist
      .snapshotChanges().subscribe(
        item=>{
          this.listaresultado=[];
          item.forEach(element=>{
            let x=element.payload.toJSON();
            x["$key"]=element.key;       
            
            
          
            this.listaresultado.push(x as Play);            
           
            
          }
         
  
          )
        }
        
      )

      //obtengo la informacion de las personas que estan en base de datos
       this.peopleservice.getpeople()
       .snapshotChanges().subscribe(
        item=>{      
          this.listpeople=[];
       item.forEach(element=>{// recorre cada persona y llama al evento setward para asingar el premio
         let x=element.payload.toJSON();
         x["$key"]=element.key; 
           this.listpeople.push(x as People);       
         
         
       }
      

       )
     }
       )

    


  }

  refreshaward()//refresca la informacion de premios
  {
    //obtengo la informacion de los premios que estan en base de datos
    this.awardservice.getawards()
    .snapshotChanges().subscribe(
     item=>{
      this.listaward=[];       
       item.forEach(element=>{// recorre cada premio
         let x=element.payload.toJSON();             
         x["$key"]=element.key;
         if(x["cant"]>0)//filtro por cantidad
         {
           this.listaward.push(x as Award);
          
           
         } 
         
        
         
       }
      

       )
       
     }
     
   )
  }



  executeresult(sorteoform:NgForm)
  {
    var error="";//variable que maneja algun error
    var cantaward=0;
    for (let a of this.listaward)
     {
       cantaward=cantaward+a.cant;//suma las cantidades que existen en base de datos

     }
     
     
     if(cantaward>0)//si existe algun premio se crea el sorteo
     {
      this.playservice.Create(sorteoform.value); 
     }
    

   for (let i of this.listpeople)//recorre cada persona que se encuentra registrada
   {
       
       if(cantaward>0)//si la cantidad de premios es mayor a 0 se asigna uno de lo contrario se arroja la alerta 
      {
        
        
         var randomItem = this.foundrandomItem();//busco un premio
         
         if(randomItem!="")
         {
           
          for (let f of this.listaward)
          {
            //console.log("key"+f.$key+"random"+randomItem.$key+""+"cant"+f.cant)
            if(f.$key==randomItem)//verifica que ese que el item tenga una cantidad >0
            {  
                         
              f.cant=f.cant-1;
              cantaward=cantaward-1;
              this.resultservice.createresult(i.$key,randomItem); //asigna a la persona el premio
              this.awardservice.updatecant(randomItem,f.cant);//actualiza en base de datos
            }

          } 

         }
         else
         {
           
         }
          
          
         
          

     
      } 
    else{
      
      error="1";
      this.toast.error("No hay suficientes existencias de premios");     
      break//se suspende la asignacion de premios
      
    }
   
   }

   if(error!="1")
   {
    this.toast.success("El sorteo fue ejecutado correctamente");
   }
    
  }
  remove(key)
  {
    this.playservice.remove(key);//elimina el sorteo
    this.resultservice.removeresult(key);//elimina los resultados de ese sorteo
  }

  open(content,sorteoform:NgForm) {
   
    this.modal.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.executeresult(sorteoform);
      
    }, (reason) => {
      this.modal.dismissAll();
    });
  }

  //funcion que me devuelve el premio
  foundrandomItem()
  {
   
    var itemfound="";
    
    var array1=[];

      
      for (let f of this.listaward)
      {
        
        if(f.cant>0)
        {
         
          array1.push(f.$key)
          
        }
        
      }
      var randomItem = array1[Math.floor(Math.random()*array1.length)];//selecciona un item al azar
    
    
  

   return randomItem;
  }

}
