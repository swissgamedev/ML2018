import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SessionService } from '../session.service';
import { TraktSearchResult } from '../trakt.service';

enum FormModes {AddMovie, ShowMovie, EditMovie};

@Component({
  selector: 'app-movie',
  templateUrl: 'movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  
  // expose enum to template
  FormModes = FormModes;

  mode:  FormModes;
  selectedMovieId: number = 0;
  movieToAdd: TraktSearchResult;

  formTitle: string;
  comment: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private session: SessionService
  ) { }

  ngOnInit() {
    this.determineMode();        
  }

  private determineMode(): void {
    if(this.route.snapshot.paramMap.get('id') === null){
      this.mode = FormModes.AddMovie;
      this.movieToAdd = this.session["selectedMovie"] as TraktSearchResult;
      console.log("Sel Movie: ", this.movieToAdd);
      this.formTitle = "Add movie:";
    } else {
      this.selectedMovieId = +this.route.snapshot.paramMap.get('id');
      this.mode = FormModes.ShowMovie;
      this.formTitle = "<MOVIE TITLE>";
    }
    console.log("Form mode: ", this.mode);
  }

}
