import { Pokemon } from './../../services/data-service/individual-pokemon-fetch.service';
import { ColorService } from './../../services/colors/color.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PokemonFetchService } from 'src/app/services/data-service/pokemon-fetch.service';
import { IndividualPokemonFetchService } from 'src/app/services/data-service/individual-pokemon-fetch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poke-mon-detail',
  templateUrl: './poke-mon-detail.component.html',
  styleUrls: ['./poke-mon-detail.component.scss'],
})
export class PokeMonDetailComponent implements OnInit {
  pokemon;

  constructor(
    private route: ActivatedRoute,
    private PokemonFetchService: PokemonFetchService,
    private ColorService: ColorService,
    private pokemonService: IndividualPokemonFetchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const pokemonName = params.get('name');
          this.getPokemonData(pokemonName);
          return this.PokemonFetchService.getExtraPokemonData(pokemonName);
        })
      )
      .subscribe((pokemon) => {
        this.pokemon = pokemon;
      });
  }

  getColor(type: string) {
    return this.ColorService.getColor(type);
  }

  getPokemonData(name: string): void {
    this.pokemonService
      .getIndividualPokemonData(name)
      .subscribe((pokemon: Pokemon) => {
        this.pokemon = pokemon;
        console.log(this.pokemon);
      });
  }

  goToDetail(pokemon: any) {
    this.router.navigate([pokemon.name]);
  }
}
