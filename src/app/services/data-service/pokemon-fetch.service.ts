import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
    const limit = `151`; // Sets the limit on how many pokemon will be fetched
    const urlManyPokemon = `${this.baseUrl}/pokemon?limit=${limit}`; // Fetches pokemon with the "limit" paramter
    return this.http.get(urlManyPokemon);
  }

  // Method responsible for getting the extra data
  // Expandable with any additional data from the normal url
  // Expanded to find all the evolution stages of a pokemon (One pokemon can evolve into multiple different pokemon, for example eevee)
  getExtraPokemonData(name: string): Observable<Pokemon> {
    const urlPokemonName = `${this.baseUrl}/pokemon/${name}`;
    return this.http.get<any>(urlPokemonName).pipe(
      // Using switchmap allows us to combine pokmemon and evolutionstages easier
      switchMap((response) => {
        // Maps the initial data before getting the evolutionstages
        const pokemon: Pokemon = {
          name: response.name,
          id: response.id,
          picture: response.sprites.front_default,
          types: response.types.map((type: any) => type.type.name), // One pokemon can have one or two typings
          evolutionStages: [], // Sets blank
        };

        const urlSpecies = response.species.url;
        // Takes the response from "getEvolutionCHain" and maps it
        return this.getEvolutionChain(urlSpecies).pipe(
          map((evolutionChain) => {
            const evolutionStages = this.extractEvolutionStages(evolutionChain); // method to get the evolution stages
            pokemon.evolutionStages = evolutionStages;
            return pokemon; // Returns the pokemon object with the evolution stages
          })
        );
      })
    );
  }

  // Calls the species url to get the evolution chain
  private getEvolutionChain(speciesUrl: string): Observable<any> {
    return this.http.get<any>(speciesUrl).pipe(
      map((response) => response.evolution_chain.url),
      switchMap((evolutionChainUrl) => this.http.get<any>(evolutionChainUrl))
    );
  }

  // fills the evolutionstages property by calling the "traverseEvolutionChain" method
  private extractEvolutionStages(evolutionChain: any): EvolutionStage[] {
    //Creates a new evolutionstage object
    const evolutionStages: EvolutionStage[] = [];
    this.traverseEvolutionChain(evolutionChain.chain, evolutionStages);
    return evolutionStages;
  }

  // Recursive traversal method to find all evolution stages of a pokemon
  // Gets the chain and object it will traverse
  private traverseEvolutionChain(
    chain: any,
    evolutionStages: EvolutionStage[]
  ): void {
    const speciesName = chain.species.name;
    const evolvesTo = chain.evolves_to;

    // Pushes the names into the array, could be expanded to collect more info (just unsure how to do that)
    evolutionStages.push({
      name: speciesName,
    });

    // Checks to see if there are more pokemon it evolves to
    if (evolvesTo && evolvesTo.length > 0) {
      evolvesTo.forEach((evolution: any) => {
        this.traverseEvolutionChain(evolution, evolutionStages); // recursive
      });
    }
  }
}

// Response interface
interface Pokemon {
  name: string;
  id: number;
  picture: string;
  types: string[];
  evolutionStages: EvolutionStage[];
}

// Response interface for evolution stages
interface EvolutionStage {
  name: string;
}
