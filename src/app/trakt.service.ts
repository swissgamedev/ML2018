import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

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
    return this.http.get<TraktSearchResult[]>(`${traktUrl}/search/movie?query=${keyword}&extended=full`, httpOptions);
  }

  getMovieDetails(id: string): any {
    return this.http.get<any>(`${traktUrl}/search/movie/${id}?extended=full`, httpOptions);
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