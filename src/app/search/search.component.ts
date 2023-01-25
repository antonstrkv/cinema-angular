import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FilmsListService } from '../home/films-list/films-list.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {

  constructor(private filmsService: FilmsListService) { }

  ngOnInit(): void {
    this.filmsService.resetFilters();
  }
}
