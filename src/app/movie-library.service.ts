import { Injectable, OnInit } from '@angular/core';
import { Movie } from './Movie.model';

@Injectable()
export class MovieLibraryService implements OnInit {

  movies: Movie[] = [];

  mockMovie: Movie = {
    title: "Fall of the Jedi: Episode III – Revenge of the Sith",
    year: 2001,
    ids: {
      imdb: "tt0121766",
      tmdb: "1895",
      slug: "star-wars-episode-iii-revenge-of-the-sith-2005",
      trakt: "1270"
    }
  };

  constructor() { }

  ngOnInit() {
    this.movies.push(this.mockMovie);
  }
}
