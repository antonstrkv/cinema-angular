import { Pipe, PipeTransform } from '@angular/core';
import { IFilmItem } from '../films-list.service';

@Pipe({
  name: 'isSavedToRead',
  pure: false
})
export class IsSavedToReadPipe implements PipeTransform {

  transform(filmsList: IFilmItem[], film: IFilmItem): boolean {
    const isSavedToRead: boolean = JSON.stringify(filmsList).includes(JSON.stringify(film)) ?? false;
    return isSavedToRead;
  }

}
