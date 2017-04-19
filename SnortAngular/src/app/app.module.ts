import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RulesComponent } from './rules/rules.component';
import { HistoryComponent } from './history/history.component';
import { ModalModule } from 'ng2-bootstrap/modal';
import { RulesService } from './rules.service';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RulesComponent,
    HistoryComponent,
    ModalDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'rules/:id', component: RulesComponent },
      { path: 'history', component: HistoryComponent }
    ]),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [RulesService],
  bootstrap: [AppComponent]
})

export class AppModule { }
