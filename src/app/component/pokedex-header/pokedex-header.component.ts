import { SearchServiceService } from './../../services/search-service/search-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pokedex-header',
  templateUrl: './pokedex-header.component.html',
  styleUrls: ['./pokedex-header.component.scss'],
})
export class PokedexHeaderComponent {
  term = '';

  constructor(private SearchServiceService: SearchServiceService) {}

  updateSearchTerm() {
    this.SearchServiceService.setSearchTerm(this.term);
  }
}
