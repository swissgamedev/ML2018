import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const tmdbAPIKey = "api_key=72757c356c5df5768ce4e92f80da96a1";
const tmdbUrl = 'https://api.themoviedb.org/3/movie/';
const tmdbConfigUrl = 'https://api.themoviedb.org/3/configuration?';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class TheMovieDbService {

  constructor(private http: HttpClient) { }

  getConfiguration(): Observable<TMDBConfig> {
    return this.http.get<TMDBConfig>(`${tmdbConfigUrl}${tmdbAPIKey}`, httpOptions);
  }

  getMovieDetails(id: string): any {
    return this.http.get<any>(`${tmdbUrl}${id}?${tmdbAPIKey}`, httpOptions);
  }
}

export class TMDBConfig {
  images:{
    base_url: string,
    poster_sizes: string[]
  }
}