import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CONSTANTS } from '../app.constants';
import { IFilmItem } from '../home/films-list/films-list.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  films$ = new Subject<IFilmItem[]>();
  activeGeners: number[] = [];
  Rating: string;
  Popularity: string;

  changeRating(rating: string) {
    this.Rating = rating;
  }

  changePopularity(popularity: string) {
    this.Popularity = popularity;
  }

  changeActiveGeners(activeGenerId: number) {
    if (!this.activeGeners.includes(activeGenerId)) {
      this.activeGeners.push(activeGenerId);
    } else {
      this.activeGeners.splice(this.activeGeners.indexOf(activeGenerId, 0), 1)
    }
  }

  sortSearchPage() {
    let FilmsList: IFilmItem[] = [];

    if (this.activeGeners.length) {
      this.activeGeners.forEach(id => {
        let listWithGener = CONSTANTS.films.filter(item => item.genre_ids.includes(Number(id)) && !FilmsList.includes(item));
        FilmsList = FilmsList.concat(listWithGener);
      });
    } else {
      FilmsList = [...CONSTANTS.films];
    }


    if (this.Rating === "High") {
      FilmsList = FilmsList.filter((item: IFilmItem) => item.vote_average > 7);
    } else {
      FilmsList = FilmsList.filter((item: IFilmItem) => item.vote_average <= 7);
    }


    if (this.Popularity === "Popularity") {
      FilmsList = FilmsList.filter((item: IFilmItem) => item.popularity > 100 && item.vote_count > 1000);
    } else {
      FilmsList = FilmsList.filter((item: IFilmItem) => item.popularity < 100 && item.vote_count < 1000);
    }

    this.films$.next(FilmsList);
  }

  constructor() { }
}
