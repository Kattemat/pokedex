import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokedexHeaderComponent } from './component/pokedex-header/pokedex-header.component';
import { PokemonComponent } from './component/pokemon/pokemon.component';
import { ShowcaseComponent } from './component/showcase/showcase.component';

@NgModule({
  declarations: [AppComponent, PokedexHeaderComponent, PokemonComponent, ShowcaseComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
