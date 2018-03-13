import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TraktService } from './trakt.service';
import { TheMovieDbService } from './the-movie-db.service';
import { MovieComponent } from './movie/movie.component';

import { AppRoutingModule} from './app-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { SessionService } from './session.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MovieComponent,
    NavigationComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [TraktService, TheMovieDbService, SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
