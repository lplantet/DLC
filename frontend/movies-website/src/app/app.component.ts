import { Component } from '@angular/core';
import { MovieComponent } from './movie/movie.component';
import { Film } from './movie/movie.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MovieComponent]
})
export class AppComponent {
  title = 'movies-website';

}
