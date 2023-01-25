import { Pipe, PipeTransform } from '@angular/core';
import { IFilmItem } from './films-list.service';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {

  transform(filmsList: IFilmItem[], sortType: string): IFilmItem[] {
    let newList: IFilmItem[] = [...filmsList];
    switch (sortType) {
      case "SORT_POPULARITY_DESCENDING":
        newList.sort((a, b) => a.popularity < b.popularity ? 1 : -1);
        return newList;
      case "SORT_POPULARITY_ASCENDING":
        newList.sort((a, b) => a.popularity > b.popularity ? 1 : -1);
        return newList;
      case "SORT_RATING_DESCENDING":
        newList.sort((a, b) => a.vote_average < b.vote_average ? 1 : -1);
        return newList;
      case "SORT_RATING_ASCENDING":
        newList.sort((a, b) => a.vote_average > b.vote_average ? 1 : -1);
        return newList;
      default:
        return newList;
    }
  }

}
