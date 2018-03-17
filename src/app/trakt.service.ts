import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const traktUrl = 'https://api.trakt.tv';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'trakt-api-key': '7ae03533f4a67d0313b77d6a2e0d388d0513462fd7585702b6f3b209c223b195',
    'trakt-api-version': '2'
  })
};

@Injectable()
export class TraktService {

  constructor(private http: HttpClient) { }

  searchMovies(keyword: string): Observable<any> {
    return this.http.get<TraktSearchResult[]>(`${traktUrl}/search/movie?query=${keyword}&extended=full`, httpOptions)
      .pipe(
        catchError(this.handleError('searchMovies', []))
      );
  }

  getMovieDetails(id: string): any {
    return this.http.get<any>(`${traktUrl}/search/movie/${id}?extended=full`, httpOptions)
      .pipe(
        catchError(this.handleError('getMovieDetails', []))
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

export class TraktSearchResult {
  type: string;
  score: any;
  movie: TraktMovie;
  imageUrl: string;
}

export class TraktMovie {
  title: string;
  year: number;
  genres: string[];
  overview: string;
  rating: number;
  released: Date;
  runtime: number;
  
  ids: {
    imdb: string;
    slug: string;
    tmdb: string;
    trakt: string;
  }
}