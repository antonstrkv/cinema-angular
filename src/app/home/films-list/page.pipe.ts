import { Pipe, PipeTransform } from '@angular/core';
import { IFilmItem } from './films-list.service';

@Pipe({
  name: 'page'
})
export class PagePipe implements PipeTransform {

  transform(filmsList: IFilmItem[], currentPage: number, pageSize: number): IFilmItem[] {

    return filmsList.slice(pageSize * (currentPage), (pageSize * (currentPage+1)));
  }

}
