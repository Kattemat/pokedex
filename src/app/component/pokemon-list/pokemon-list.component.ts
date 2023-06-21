import { ColorService } from './../../services/colors/color.service';
import { SearchServiceService } from './../../services/search-service/search-service.service';
import { Component, OnInit } from '@angular/core';
import { PokemonFetchService } from 'src/app/services/data-service/pokemon-fetch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemon: any[] = []; // Empty array to fill with pokemon
  searchTerm: string = '';

  constructor(
    private pokemonFetchService: PokemonFetchService,
    private SearchServiceService: SearchServiceService,
    private router: Router,
    private ColorService: ColorService
  ) {
    this.SearchServiceService.searchObservable.subscribe((term) => {
      this.searchTerm = term;
    });
  }

  // On init, it will call the pokemon api and get a nummer of pokemon with the 'getPokemon' method
  // For each pokemon it gets, it will also call for additional information with the 'getExtraPokemonData' method
  ngOnInit(): void {
    this.pokemonFetchService.getPokemon().subscribe((response: any) => {
      response.results.forEach((result) => {
        // tsconfig.json had to be changed for this to work
        this.pokemonFetchService
          .getExtraPokemonData(result.name) // Gets additional data based on the name of the pokemon, can be configured to work with ID as well
          .subscribe((uniqResponse: any) => {
            this.pokemon.push(uniqResponse);
          });
      });
      console.log(this.pokemon); // Sends the response to the console, only for testing/ viewing
    });
  }

  //sjekker om søket matcher navnet på pokemon
  search() {
    if (!this.searchTerm) {
      return this.pokemon;
    }

    return this.pokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  goToDetail(pokemon: any) {
    this.router.navigate([pokemon.name]);
  }

  getColor(type: string) {
    return this.ColorService.getColor(type);
  }
}
