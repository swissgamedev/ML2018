import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TraktService, TraktSearchResult } from '../trakt.service';
import { Observable } from 'rxjs/Observable';
import { TheMovieDbService, TMDBConfig } from '../the-movie-db.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  readonly placeholderImage: string = '../assets/images/placeholder.png';

  results: TraktSearchResult[];
  tmdbConfig: TMDBConfig;
  searching: boolean = false;
  errors: string = '';

  constructor(
    private trakt: TraktService, 
    private tmdb: TheMovieDbService,
    private router: Router,
    private session: SessionService
  ) { }

  ngOnInit() {
    this.tmdb.getConfiguration().subscribe((configResult) => {
      this.tmdbConfig = configResult;
      if(!this.tmdbConfig){
        this.errors += `The Movie DB didn't return it's configuration. No pictures will be shown.`;
      }
    });
  }

  searchMovie(keyword: string): void {
    this.searching = true;
    this.trakt.searchMovies(keyword).subscribe((result) => {
      //console.dir(result);
      if(!result || result.length===0){
        this.errors += `No movies were found for keyword '${keyword}'`;
      }
      result.sort(function(a, b){
        if(a.movie.year < b.movie.year) return 1;
        else if(a.movie.year > b.movie.year) return -1;
        else return 0;
      });
      this.searching = false;
      this.results = result;
      for(let i=0; i<result.length; i++){
        this.tmdb.getMovieDetails(this.results[i].movie.ids.tmdb).subscribe((tmdbResult) => {
          // console.dir(tmdbResult);
          // console.log(this.tmdbConfig.images.base_url+this.tmdbConfig.images.poster_sizes[0]+tmdbResult.poster_path);
          if(tmdbResult){
            this.results[i].imageUrl = this.tmdbConfig.images.base_url+this.tmdbConfig.images.poster_sizes[0]+tmdbResult.poster_path;
          } else {
            // todo: placeholder image
            this.results[i].imageUrl = "";
          }
        });
      }
    });
  }

  getMovieDetails(id: string): void {    
    this.trakt.getMovieDetails(id).subscribe((result) => {
      console.dir(result);
    });
  }

  onKey(event: any) {
    if(event.charCode == 13){      
      this.results = null;
      this.searchMovie(event.target.value);
    }
  }

  onSelect(selMovie: TraktSearchResult): void {
    this.session["selectedMovie"] = selMovie;
    this.router.navigate(["detail"]);
  }
}
