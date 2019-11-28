import { Component, OnInit } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {PeopleService} from '../services/people.service';
import {ResultsService} from '../services/results.service'
import { NgForm } from '@angular/forms';
import { AngularFireList} from '@angular/fire/database';
import {People} from '../model/People';
import {ToastrService} from 'ngx-toastr';
import { Result } from '../model/Result';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  $key="";
  tipodoc="tipodoc";
  doc="";
  nombre="";
  apellidos="";
  fechanac="";
  peoplelist:AngularFireList<any>;
  listaresultado: any[]=[];
  resultlist:AngularFireList<any>;
  listresult: any[]=[];
  titulo="";//titulo para el modal
  date = new Date();
  p: number = 1;
  c="";
  constructor(private modalService: NgbModal, private peopleservice:PeopleService, private toast:ToastrService,
    private resultservice:ResultsService ) { }

  ngOnInit() {
      //this.tipodoc="Tipo Documento"
      
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

      this.resultlist=this.resultservice.getresult()
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
  /*Accion
    1-e=editar
    2-c=crear*/ 
  open(content,accion,tipodocsel?,docsel?,nombresel?,apellidosel?,fechanacsel?,$keysel?) {
   
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
   if(accion=="e")
   {
     this.$key=$keysel;
     this.tipodoc=tipodocsel;
     this.doc=docsel,
     this.nombre=nombresel,
     this.apellidos=apellidosel,
     this.fechanac=fechanacsel;
     this.titulo="Editar";
     
   }
   else
   {
     
     this.titulo="Ingresar"
    this.tipodoc="tipodoc"
    this.doc="",
    this.nombre="",
    this.apellidos="",
    this.fechanac="";
   }
   
    
  }

  onSubmit(peopleform:NgForm)
  {
    /* 1-Existe
       0-No existe*/
    try {
      
      
      var exist=this.checkuser(this.doc,this.tipodoc);
      var today=this.date.getFullYear() +"-"+ (this.date.getMonth()+1).toString().padStart(2,"0") +"-"+this.date.getDate().toString().padStart(2,"0");
      if(exist=="1")
      {
        this.toast.error("El participante ya se encuentra registrado");
      }
      else
      {
        if(this.fechanac>today)
        {
          this.toast.error("Por favor revise la fecha de nacimiento");
        }
        else
        {
          this.peopleservice.Create(peopleform.value);
          this.modalService.dismissAll();
          this.toast.success("El participante fue creado correctamente");
        }
        

      }
      

      
    } catch (error) {
      this.toast.error("Hubo un problema, por favor revisa la información ingresada");
    }
    

  }

  remove(key)
  {
    var existe=0;
    for(let i of this.listresult)
    {
      console.log(i.keyperson)
      if(i.keyperson==key)
      {
        existe=1
       
      }
        
      
    }
    if(existe==1)
    {
      this.toast.error("El participante tiene premios asignados");
    }
    else{
      this.peopleservice.remove(key);
    }
    
  }

  edit(peopleform:NgForm)
  {
    try {
      this.peopleservice.edit(peopleform.value,this.$key);
      this.modalService.dismissAll();
      this.toast.success("El participante fue modificado correctamente");

      
    } catch (error) {
      this.toast.error("Hubo un problema, por favor revisa la información ingresada");
    }
    

  }

  checkuser(doc,tipodoc)
  {
    var exist="";
    for(let i of this.listaresultado)
    {
       if((i.doc==doc)&&(tipodoc==i.tipodoc))
       {
         
        exist="1"
       }
       else
       {
         exist="0";
       }
    }

    return exist;
  }

}
