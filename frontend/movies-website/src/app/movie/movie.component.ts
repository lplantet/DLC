import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Film } from './movie.model';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operator';
//import 'rxjs/add/observable/map';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input('movie') film : Film; 
  moviesArray = new Array<Film>();
  moviesTab = new Array<Film>();

  constructor(/*private httpService : HttpClient*/) { 
  
    let film1 : Film = new Film();
    film1.title = "Titanic";
    film1.genre = "Drame";
    film1.rating = "4";
    film1.duration = "175 min";
    film1.image = "assets/css/images/movie2.jpg";
    let film2 : Film = new Film();
    film2.title = "Ma famille";
    film2.genre = "Comedie";
    film2.rating = "3";
    film2.duration = "140 min";
    film2.image = "assets/css/images/movie4.jpg";
    this.moviesArray.push(film1);
    this.moviesArray.push(film2);
  
  }

  //getMovies() : Observable<Array<Film>>{
  //  return this.http.get('./movies.json')
  //  .pipe(map((resp: Response) => resp.json()));
  //} 

  ngOnInit() {
//    this.httpService.get('./movies.json').subscribe(
//      data => {
//        this.moviesTab = data as Array<Film>;
//      }
//    );
  }
}
