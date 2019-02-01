import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Film } from './movie.model';
import { HttpClient } from '@angular/common/http';
//import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import 'rxjs/add/operator/map';
import { FilterPipe } from '../filter.pipe';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers: [MovieComponent]
})

@Injectable()
export class MovieComponent implements OnInit {

  @Input('movie') film : Film; 
  moviesArray = new Array<Film>();
  moviesTab = new Array<Film>();
  term : string;

  //private _url:string="../assets/mock_data/movies.json";
  private _url:string="http://148.60.11.164:3000/search";

  constructor(private _http: HttpClient) { 

  }

  getMovies() {
    this._http.get(this._url, {params: {film: this.term}}).subscribe(data => {
      this.moviesTab = data as Array<Film>;
    });
  }

  ngOnInit() {
    /*
    this.getMovies().subscribe(
      data => {
        this.moviesTab = data as Array<Film>;
      }
    );*/
  }
}
