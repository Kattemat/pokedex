import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs';
import { PokemonFetchService } from 'src/app/services/data-service/pokemon-fetch.service';

/*
*   Service that gets data for an individual pokemon
*     -General info (pokemon name, id, type)
*     -Pictures (front and back sprites, shiny sprite and official artwork)
*     -Evolution info (all evolution stages)
*
*/


@Injectable({
  providedIn: 'root'
})
export class IndividualPokemonFetchService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  // Method responsible for data when choosing an individual pokemon
  // Expandable with any additional data from the normal url
  // Expanded to find all the evolution stages of a pokemon (One pokemon can evolve into multiple different pokemon, for example eevee)
  getIndividualPokemonData(name: string): Observable<Pokemon> {
    const urlPokemonName = `${this.baseUrl}/pokemon/${name}`;
    return this.http.get<any>(urlPokemonName).pipe(
      
      // Using switchmap allows us to combine pokemon and evolutionstages easier
      switchMap(response => {
        // Maps the initial data before getting the evolutionstages
        const pokemon: Pokemon = {
          name: response.name,
          id: response.id,
          picture_official: response.sprites.other['official-artwork'].front_default,
          picture_front: response.sprites.front_default,
          picture_back: response.sprites.back_default,
          picture_shiny: response.sprites.front_shiny,
          types: response.types.map((type: any) => type.type.name), // One pokemon can have one or two typings
          evolutionStages: [], // Sets blank
          flavorTextEntries: [],
          randomFlavorText: ''
        };

        const urlSpecies = response.species.url;
        // Takes the response from "getEvolutionCHain" and maps it
        return this.getEvolutionChain(urlSpecies).pipe(
          switchMap(evolutionChain => {
            const evolutionStages = this.extractEvolutionStages(evolutionChain); // method to get the evolution stages
            pokemon.evolutionStages = evolutionStages;
            
            const speciesUrl = `${this.baseUrl}/pokemon-species/${response.id}`;
            return this.getPokemonSpeciesData(speciesUrl).pipe(
              map(flavorTextEntries => {
                if (flavorTextEntries && flavorTextEntries.length > 0) {
                  pokemon.flavorTextEntries = flavorTextEntries;
                  pokemon.randomFlavorText = this.getRandomFlavorText(pokemon);
                }
                return pokemon; // Returns the pokemon object with the evolution stages and flavortext
              })
            );
          })
        );
      })
    );
  }

  // Calls the species url to get the evolution chain
  private getEvolutionChain(speciesUrl: string): Observable<any> {
    return this.http.get<any>(speciesUrl).pipe(
      map(response => response.evolution_chain.url),
      switchMap(evolutionChainUrl => this.http.get<any>(evolutionChainUrl))
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
  private traverseEvolutionChain(chain: any, evolutionStages: EvolutionStage[]): void {
    const speciesName = chain.species.name;
    const evolvesTo = chain.evolves_to;

    const sprite = this.getPokemonPicture(speciesName);

    // Sends a call to get just the picture of the pokemon
    this.getPokemonPicture(speciesName).subscribe(sprite => {
      // Pushes the names into the array, could be expanded to collect more info (just unsure how to do that)
      evolutionStages.push({
        name: speciesName,
        sprite: sprite
      });

      // Checks to see if there are more pokemon it evolves to
      if (evolvesTo && evolvesTo.length > 0) {
        evolvesTo.forEach((evolution: any) => {
          this.traverseEvolutionChain(evolution, evolutionStages); // recursive
        });
      }
    });
  }

  // Gets flavor text entries for a given species URL
private getPokemonSpeciesData(speciesUrl: string): Observable<FlavorTextEntry[]> {
  return this.http.get<any>(speciesUrl).pipe(
    map(response => response.flavor_text_entries)
  );
}

// Gets the first flavor text from the flavor text entries
private getRandomFlavorText(pokemon: Pokemon): string {
  const flavorTextEntries = pokemon.flavorTextEntries;

  if (flavorTextEntries && flavorTextEntries.length > 0) {
    return flavorTextEntries[0].flavor_text;
  }
  return '';
  }

private getPokemonPicture(name: string): Observable<string> {
  const urlPokemonName = `${this.baseUrl}/pokemon/${name}`;
  return this.http.get<any>(urlPokemonName).pipe(
    map(response => response.sprites.front_default)
  );
}

}

// Response interface
export interface Pokemon {
  name: string;
  id: number;
  picture_official: string;
  picture_front: string;
  picture_back: string;
  picture_shiny: string;
  types: string[];
  evolutionStages: EvolutionStage[];
  flavorTextEntries: FlavorTextEntry[];
  randomFlavorText: string;
}

// Response interface for evolution stages
interface EvolutionStage {
  name: string;
  sprite: string;
}

// Interface for the flavor text (also known as pokedex entry)
interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}
