import { Component, OnInit } from '@angular/core';
import {
  IndividualPokemonFetchService,
  Pokemon,
} from 'src/app/services/data-service/individual-pokemon-fetch.service';

@Component({
  selector: 'app-pokemon-individual',
  templateUrl: './pokemon-individual.component.html',
  styleUrls: ['./pokemon-individual.component.scss'],
})
export class PokemonIndividualComponent implements OnInit {
  pokemon: Pokemon | null = null;

  constructor(private pokemonService: IndividualPokemonFetchService) {}

  ngOnInit(): void {
    this.getPokemonData('pikachu'); // hardcoded to test functionality
  }

  getPokemonData(name: string): void {
    this.pokemonService
      .getIndividualPokemonData(name)
      .subscribe((pokemon: Pokemon) => {
        this.pokemon = pokemon;
      });
  }
}
