import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CONSTANTS } from 'src/app/app.constants';


export interface IFilmItem {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}


export const TO_SHOW = {
  All: "ALL",
  FAV: "FAV",
  TO_READ: "TO_READ"
}

@Injectable({
  providedIn: 'root'
})
export class FilmsListService {
  filmsList$ = new BehaviorSubject<Array<IFilmItem>>(CONSTANTS.films
    .filter((item: IFilmItem) => String(new Date(item.release_date).getFullYear()) === ("2020")));
  favoriteList$ = new BehaviorSubject<Array<IFilmItem>>(JSON.parse(localStorage.getItem('favoriteList')!));
  toReadList$ = new BehaviorSubject<Array<IFilmItem>>(JSON.parse(localStorage.getItem('toReadList')!));
  sortType$ = new BehaviorSubject<string>('SORT_POPULARITY_DESCENDING');
  pageIndex$ = new BehaviorSubject<number>(0);

  sortReleaseDate: string = "2020";
  activeGeners: number[] = [];
  favoriteList: IFilmItem[] = [];
  toReadList: IFilmItem[] = [];
  LIST_TO_SHOW: string = TO_SHOW.All;


  changePageIndex(index: number) {
    this.pageIndex$.next(index);
  }

  changeSortType(sortType: string) {
    this.sortType$.next(sortType);
  }


  changeReleaseDate(releaseDate: string) {
    this.sortReleaseDate = releaseDate;
    this.filterList();
  }


  changeActiveGeners(activeGenerId: number) {
    if (!this.activeGeners.includes(activeGenerId)) {
      this.activeGeners.push(activeGenerId);
    } else {
      this.activeGeners.splice(this.activeGeners.indexOf(activeGenerId, 0), 1)
    }
    this.filterList();
  }

  resetFilters() {
    this.sortType$.next('SORT_POPULARITY_DESCENDING');
    this.sortReleaseDate = "2020";
    this.activeGeners = [];
    this.filterList();
  }


  changeFavoriteList(filmObj: IFilmItem) {
    const isSavedFavorite: boolean = JSON.stringify(this.favoriteList).includes(JSON.stringify(filmObj)) ?? false;

    (isSavedFavorite) ?
      this.favoriteList.splice(this.favoriteList.indexOf(filmObj, 0), 1)
      :
      this.favoriteList.push(filmObj);

    this.favoriteList$.next(this.favoriteList);
    localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));
  }


  changeToReadList(filmObj: IFilmItem) {
    const isSavedToRead: boolean = JSON.stringify(this.toReadList).includes(JSON.stringify(filmObj)) ?? false;

    (isSavedToRead) ?
      this.toReadList.splice(this.toReadList.indexOf(filmObj, 0), 1)
      :
      this.toReadList.push(filmObj);

    this.toReadList$.next(this.toReadList);
    localStorage.setItem('toReadList', JSON.stringify(this.toReadList));
  }


  changeListToShow(list: string) {
    this.LIST_TO_SHOW = list;
    this.filterList();
  }


  filterList() {
    let listToFilter: IFilmItem[] = [];
    switch (this.LIST_TO_SHOW) {
      case TO_SHOW.All:
        listToFilter = CONSTANTS.films;
        break;
      case TO_SHOW.FAV:
        listToFilter = this.favoriteList;
        break;
      case TO_SHOW.TO_READ:
        listToFilter = this.toReadList;
        break;
    }

    let FilmsList: IFilmItem[] = [];
    if (!this.activeGeners.length) {
      FilmsList = listToFilter.filter((item: IFilmItem) => String(new Date(item.release_date).getFullYear()) === (this.sortReleaseDate));
    } else {
      this.activeGeners.forEach(id => {
        let listWithGener = listToFilter.filter((item: IFilmItem) => item.genre_ids.includes(Number(id)) && !FilmsList.includes(item));
        FilmsList = FilmsList.concat(listWithGener);
      });
      FilmsList = FilmsList.filter((item: IFilmItem) => String(new Date(item.release_date).getFullYear()) === (this.sortReleaseDate));
    }

    this.filmsList$.next(FilmsList);
    this.changePageIndex(0);
  }
}
