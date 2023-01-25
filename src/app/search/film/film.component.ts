import { Component } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent {

  constructor(public searchService: SearchService){}
}
