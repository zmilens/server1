import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StudentsComponent } from './students/students.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortPipe } from './shared/sort.pipe';
import {NgxMaskModule} from "ngx-mask";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentsComponent,
    AddComponent,
    EditComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(/*options*/)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
