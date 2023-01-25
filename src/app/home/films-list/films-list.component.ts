import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FilmsListService } from './films-list.service';



@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./films-list.component.css'],
})
export class FilmsListComponent {
  pageSize = 12;

  handlePageEvent(e: PageEvent) {
    this.filmsService.changePageIndex(e.pageIndex)
    this.pageSize = e.pageSize;
  }

  constructor(public filmsService: FilmsListService) { }
}
