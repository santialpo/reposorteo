import { Component, OnInit } from '@angular/core';
import { AngularFireList} from '@angular/fire/database';
import {AwardService} from '../services/award.service';
import { NgForm } from '@angular/forms';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import { Award } from '../model/Award';

@Component({
  selector: 'app-award',
  templateUrl: './award.component.html',
  styleUrls: ['./award.component.css']
})
export class AwardComponent implements OnInit {

  $key="";
  cod="";
  desc="";
  cant="";  
  awardlist:AngularFireList<any>;
  listaresultado: any[]=[];
  titulo="";//titulo para el modal
  p: number = 1;
  c="";
  constructor(private modalService: NgbModal,private awardservice:AwardService, private toast:ToastrService) { }

  ngOnInit() {
    this.awardlist=this.awardservice.getawards();
    this.awardlist
    .snapshotChanges().subscribe(
      item=>{
        this.listaresultado=[];
        item.forEach(element=>{
          let x=element.payload.toJSON();
          x["$key"]=element.key;       
          
          
        
          this.listaresultado.push(x as Award);            
         
          
        }
       

        )
      }
      
    )
  }

  /*Accion
    1-e=editar
    2-c=crear*/ 
    open(content,accion,codsel?,descsel?,cantsel?,$keysel?) {
   
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
     if(accion=="e")
     {
       this.$key=$keysel;
       this.cod=codsel;
       this.desc=descsel;
       this.cant=cantsel;
       this.titulo="Editar";
       
     }
     else
     {
       
       this.titulo="Ingresar"
      this.cod="";
      this.desc="";
      this.cant="";
     }
     
      
    }
  
    onSubmit(awardform:NgForm)
    {
      try {
        this.awardservice.Create(awardform.value);
        this.modalService.dismissAll();
        this.toast.success("El premio fue creado correctamente");
  
        
      } catch (error) {
        console.log(error);
        this.toast.error("Hubo un problema, por favor revisa la información ingresada");
      }
      
  
    }
  
    remove(key)
    {
      this.awardservice.remove(key);
    }
  
    edit(awardform:NgForm)
    {
      try {
        this.awardservice.edit(awardform.value,this.$key);
        this.modalService.dismissAll();
        this.toast.success("El premio fue modificado correctamente");
  
        
      } catch (error) {
        this.toast.error("Hubo un problema, por favor revisa la información ingresada");
      }
      
  
    }

}
