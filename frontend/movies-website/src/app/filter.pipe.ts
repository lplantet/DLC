import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(tabMovies: any, term: any): any {
    if (term === undefined) return tabMovies;
    return tabMovies.filter(function(movie){
      return movie.title.toLowerCase().includes(term.toLowerCase());
    });
  }

}
