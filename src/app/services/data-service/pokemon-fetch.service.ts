import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/*
 *   Service that gets data for a list of pokemon
 *     -General info (pokemon name, id, types)
 *     -Pictures (front and back sprites)
 *
 */

@Injectable({
  providedIn: 'root',
})
export class PokemonFetchService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  // Method of getting multiple pokemon
  // Gets pokemon starting from the first in the pokedex
  // Only gets the name of the pokemon
  getPokemon() {
    const limit = `151`; // Sets the limit on how many pokemon will be fetched, gen 1 = 151 pokemon
    const urlManyPokemon = `${this.baseUrl}/pokemon?limit=${limit}`; // Fetches pokemon with the "limit" paramter
    return this.http.get(urlManyPokemon);
  }

  // Method responsible for getting the extra data
  // Expandable with any additional data from the normal url
  getExtraPokemonData(name: string): Observable<Pokemon> {
    const urlPokemonName = `${this.baseUrl}/pokemon/${name}`;
    return this.http.get<any>(urlPokemonName).pipe(
      map((response) => ({
        name: response.name,
        id: response.id,
        picture: response.sprites.front_default,
        types: response.types.map((type: any) => type.type.name), // One pokemon can have one or two typings
      }))
    );
  }
}

// Response interface
interface Pokemon {
  name: string;
  id: number;
  picture: string;
  types: string[];
}
