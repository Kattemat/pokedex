import { Component } from '@angular/core';
import { PokemonFetchService } from 'src/app/data-service/pokemon-fetch.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  pokemon: any[] = []; // Empty array to fill with pokemon
  searchTerm: string = '';

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

  search() {
    if (!this.searchTerm) {
      return this.pokemon;
    }

    return this.pokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  //legger bakgrunsfarge på pokemon etter element type
  getColor(type: string) {
    switch (type) {
      case 'normal':
        return '#A8A77A';
      case 'fire':
        return '#EE8130';
      case 'water':
        return '#6390F0';
      case 'electric':
        return '#F7D02C';
      case 'grass':
        return '#7AC74C';
      case 'ice':
        return '#96D9D6';
      case 'ground':
        return '#E2BF65';
      case 'flying':
        return '#A98FF3';
      case 'fighting':
        return '#C22E28';
      case 'psychic':
        return '#F95587';
      case 'rock':
        return '#F95587';
      case 'ghost':
        return '#E2BF65';
      case 'dragon':
        return '#6F35FC';
      case 'fairy':
        return '#D685AD';
      case 'bug':
        return '#789860';
      case 'poison':
        return '#A33EA1';
      default:
        return 'white';
    }
  }
}
