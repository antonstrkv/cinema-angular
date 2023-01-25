import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { FilmsListService, IFilmItem } from '../films-list.service';


@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./film-card.component.css'],
})
export class FilmCardComponent implements OnInit, OnDestroy {
  @Input() film: IFilmItem;
  isAuth: boolean;
  Sub: Subscription;

  constructor(public filmsService: FilmsListService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.Sub = this.authService.user.subscribe({
      next: (userData) => {
        this.isAuth = !!userData;
      }
    })
  }

  ngOnDestroy(): void {
    this.Sub.unsubscribe();
  }

  onChangeFavorite() {
    if (this.isAuth) {
      this.filmsService.changeFavoriteList(this.film);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  onChangeToRead() {
    if (this.isAuth) {
      this.filmsService.changeToReadList(this.film);
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
