import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  email="";
  password="";
  constructor(private authservice:AuthService) { }

  ngOnInit() {
  }

  login()
  {
    
    this.authservice.login(this.email,this.password);

  }
 

}
