import { Component, OnInit } from '@angular/core';
import {ResultsService} from '../services/results.service';
import {AwardService} from '../services/award.service';
import {PeopleService} from '../services/people.service';
import {PlayService} from '../services/play.service'
import { AngularFireList} from '@angular/fire/database';
import {People} from '../model/People';
import { Award } from '../model/Award';
import { Result } from '../model/Result';
import { Play } from '../model/Play';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  peoplelist:AngularFireList<any>;
  listaresultado: any[]=[];
  awardlist:AngularFireList<any>;
  listaward: any[]=[];
  resultlist:AngularFireList<any>;
  listresult: any[]=[];
  playlist:AngularFireList<any>;
  listplay: any[]=[];
  p: number = 1;
  constructor(private resultservice:ResultsService,private awardservice:AwardService,private peopleservice:PeopleService,
    private playservice:PlayService) { }

  ngOnInit() {

    //Obtengo las personas
    this.getpeople();
    //obtener premios
    this.getawards();

    //obtener resultados
    this.getresults();
    
    //obtener sorteo
    this.getplay();
   
    


  }

  getpeople()
  {
    this.peoplelist=this.peopleservice.getpeople();
    this.peoplelist
    .snapshotChanges().subscribe(
      item=>{
        this.listaresultado=[];
        item.forEach(element=>{
          let x=element.payload.toJSON();
          x["$key"]=element.key;       
          
          
        
          this.listaresultado.push(x as People);            
         
          
        }
       

        )
      }
      
    )
  }

  getawards()
  {
    this.awardlist=this.awardservice.getawards();
    this.awardlist
    .snapshotChanges().subscribe(
      item=>{
        this.listaward=[];
        item.forEach(element=>{
          let x=element.payload.toJSON();
          x["$key"]=element.key;       
          
          
        
          this.listaward.push(x as Award);            
         
          
        }
       

        )
      }
      
    )
  }

  getresults()
  {
    this.resultlist=this.resultservice.getresult();
    this.resultlist
    .snapshotChanges().subscribe(
      item=>{
        this.listresult=[];
        item.forEach(element=>{
          let x=element.payload.toJSON();
          x["$key"]=element.key;       
          
          
        
          this.listresult.push(x as Result);            
         
          
        }
       

        )
      }
      
    )


   }

   getplay()
   {
    this.playlist=this.playservice.getplay();
    this.playlist
      .snapshotChanges().subscribe(
        item=>{
          this.listplay=[];
          item.forEach(element=>{
            let x=element.payload.toJSON();
            x["$key"]=element.key;       
            
            
          
            this.listplay.push(x as Play);            
           
            
          }
         
  
          )
        }
        
      )
   }

   showresult(keyplay)
   {
    var array2=[];
    var array1=[];
   
     for(let f of this.listresult)
     {
        
       if (f.play==keyplay)
       {
         
         var name=this.nameperson(f.keyperson);
         var award=this.nameaward(f.keyaward);
        array1 = [
          {"person": name, "award": award}
        ];
        
        array2=array2.concat(array1);

       }
     }
     return array2;
    
   }

   nameperson(keyperson)
   {
     var name="";
     for(let i of this.listaresultado)
     {
       if(i.$key==keyperson)
       {
         name=i.nombre+" "+i.apellidos;
       }
     }
     return name;
   }

   nameaward(keyaward)
   {
    var desc="";
    for(let i of this.listaward)
    {
      if(i.$key==keyaward)
      {
        desc=i.desc;
      }
    }
    return desc;

   }

 



}
