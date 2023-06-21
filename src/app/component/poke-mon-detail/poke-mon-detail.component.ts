import { ColorService } from './../../services/colors/color.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PokemonFetchService } from 'src/app/services/data-service/pokemon-fetch.service';

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
    private ColorService: ColorService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) =>
          this.PokemonFetchService.getExtraPokemonData(params.get('name'))
        )
      )
      .subscribe((pokemon) => {
        this.pokemon = pokemon;
      });
  }

  getColor(type: string) {
    return this.ColorService.getColor(type);
  }
}
