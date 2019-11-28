import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { BodyComponent } from './ui/body/body.component';
import { AuthComponent } from './auth/auth.component';
import { ResultsComponent } from './results/results.component';
import { PeopleComponent } from './people/people.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; 

//firebase
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule}  from '@angular/fire/database';

//iconos
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//animaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule }  from 'ngx-toastr';
import { AwardComponent } from './award/award.component';
import { PlayComponent } from './play/play.component';

//pipe
import { FilterPipe } from '../app/pipe/filtrotablas.pipes';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    AuthComponent,
    ResultsComponent,
    PeopleComponent,
    AwardComponent,
    PlayComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),    
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [FilterPipe]
})
export class AppModule { }
