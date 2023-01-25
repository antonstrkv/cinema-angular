import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from 'src/material.module';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { FiltersComponent } from './home/filters/filters.component';
import { FilmsListComponent } from './home/films-list/films-list.component';
import { FilmCardComponent } from './home/films-list/film-card/film-card.component';
import { PagePipe } from './home/films-list/page.pipe';
import { SortPipe } from './home/films-list/sort.pipe';
import { AlertComponent, AuthComponent } from './auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IsSavedFavoritePipe } from './home/films-list/film-card/is-saved-favorite.pipe';
import { IsSavedToReadPipe } from './home/films-list/film-card/is-saved-to-read.pipe';
import { StepperComponent } from './search/stepper/stepper.component';
import { FilmComponent } from './search/film/film.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    FiltersComponent,
    FilmsListComponent,
    FilmCardComponent,
    PagePipe,
    SortPipe,
    AuthComponent,
    AlertComponent,
    IsSavedFavoritePipe,
    IsSavedToReadPipe,
    StepperComponent,
    FilmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
