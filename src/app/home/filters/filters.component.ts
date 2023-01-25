import { ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CONSTANTS } from 'src/app/app.constants';
import { AuthService } from 'src/app/auth/auth.service';
import { FilmsListService } from '../films-list/films-list.service';

export interface Chips {
  id: number;
  name: string;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  CHECKBOXES: Chips[] = CONSTANTS.checkboxes;
  @ViewChildren('chip') chip: QueryList<any>;
  @ViewChild('selectSortType') selectSortType: ElementRef;
  @ViewChild('selectReleaseYear') selectReleaseYear: ElementRef;

  onChangeSortType(event: Event) {
    this.filmsService.changeSortType((event.target as HTMLSelectElement).value);
  }

  onChangeReleaseDate(event: Event) {
    this.filmsService.changeReleaseDate((event.target as HTMLSelectElement).value);
  }

  onChangeActiveGeners(id: number) {
    this.filmsService.changeActiveGeners(id);
  }

  onChangeListToShow(event: Event) {
    this.filmsService.changeListToShow((event.target as HTMLSelectElement).value);
  }

  resetFilters() {
    this.chip.forEach((item) => { item.selected = false });
    this.selectSortType.nativeElement.selected = true;
    this.selectReleaseYear.nativeElement.selected = true;
    this.filmsService.resetFilters();
  }

  constructor(private filmsService: FilmsListService, public authService: AuthService) { }
}
