import { Component } from '@angular/core';
import { PokemonFetchService } from 'src/app/data-service/pokemon-fetch.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  pokemon: any[] = []; // Empty array to fill with pokemon

  constructor(private pokemonFetchService: PokemonFetchService) {}

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
}
