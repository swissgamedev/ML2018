import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

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
    return this.http.get<TMDBConfig>(`${tmdbConfigUrl}${tmdbAPIKey}`, httpOptions)
      .pipe(
        catchError(this.handleError('getConfiguration', null))
      );
  }

  getMovieDetails(id: string): Observable<TMDBMovie> {
    return this.http.get<TMDBMovie>(`${tmdbUrl}${id}?${tmdbAPIKey}`, httpOptions)
      .pipe(
        catchError(this.handleError('getMovieDetails', null))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

export class TMDBMovie {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  poster_path: string;
  belongs_to_collection: string;
}

export class TMDBConfig {
  images:{
    base_url: string,
    poster_sizes: string[]
  }
}