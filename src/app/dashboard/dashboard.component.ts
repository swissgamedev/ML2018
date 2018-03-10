import { Component, OnInit } from '@angular/core';
import { TraktService, TraktSearchResult } from '../trakt.service';
import { Observable } from 'rxjs/Observable';
import { TheMovieDbService, TMDBConfig } from '../the-movie-db.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styles: ['dashboard.components.scss']
})
export class DashboardComponent implements OnInit {

  results: TraktSearchResult[];
  tmdbConfig: TMDBConfig;

  constructor(private trakt: TraktService, private tmdb: TheMovieDbService) { }

  ngOnInit() {
    this.tmdb.getConfiguration().subscribe((configResult) => {
      this.tmdbConfig = configResult;
      console.dir(this.tmdbConfig);
    });
  }

  searchMovie(keyword: string): void {
    this.trakt.searchMovies(keyword).subscribe((result) => {
      console.dir(result);
      this.results = result;
      for(let i=0; i<result.length; i++){
        this.tmdb.getMovieDetails(this.results[i].movie.ids.tmdb).subscribe((tmdbResult) => {
          console.dir(tmdbResult);
          console.log(this.tmdbConfig.images.base_url+this.tmdbConfig.images.poster_sizes[0]+tmdbResult.poster_path);
          this.results[i].imageUrl = this.tmdbConfig.images.base_url+this.tmdbConfig.images.poster_sizes[0]+tmdbResult.poster_path;
        });
      }
    });
  }

  getMovieDetails(id: string): void {    
    this.trakt.getMovieDetails(id).subscribe((result) => {
      console.dir(result);
    });
  }
}
