import { Component, OnInit } from '@angular/core';
import { TraktService, TraktSearchResult } from '../trakt.service';
import { Observable } from 'rxjs/Observable';
import { TheMovieDbService, TMDBConfig } from '../the-movie-db.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
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
      result.sort(function(a, b){
        if(a.movie.year < b.movie.year) return 1;
        else if(a.movie.year > b.movie.year) return -1;
        else return 0;
      });
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

  onKey(event: any) {
    if(event.charCode == 13){      
      this.results = null;
      this.searchMovie(event.target.value);
    }
  }
}
