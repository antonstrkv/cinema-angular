import { Pipe, PipeTransform } from '@angular/core';
import { IFilmItem } from '../films-list.service';

@Pipe({
  name: 'isSavedFavorite',
  pure: false
})
export class IsSavedFavoritePipe implements PipeTransform {

  transform(filmsList: IFilmItem[], film: IFilmItem): boolean {
    const isSavedFavorite: boolean = JSON.stringify(filmsList).includes(JSON.stringify(film)) ?? false;
    return isSavedFavorite;
  }

}
