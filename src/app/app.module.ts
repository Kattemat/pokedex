import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PokemonListComponent } from './component/pokemon-list/pokemon-list.component';
import { PokedexHeaderComponent } from './component/pokedex-header/pokedex-header.component';
import { ShowcaseComponent } from './component/showcase/showcase.component';
import { FormsModule } from '@angular/forms';
import { PokemonIndividualComponent } from './component/pokemon-individual/pokemon-individual.component';

@NgModule({
  declarations: [
    AppComponent,
    PokedexHeaderComponent,
    PokemonListComponent,
    ShowcaseComponent,
    PokemonIndividualComponent,
  ],
  imports: [HttpClientModule, BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
