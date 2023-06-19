import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PokemonListComponent } from './component/pokemon-list/pokemon-list.component';
import { PokedexHeaderComponent } from './component/pokedex-header/pokedex-header.component';
import { ShowcaseComponent } from './component/showcase/showcase.component';

@NgModule({
  declarations: [
    AppComponent,
    PokedexHeaderComponent,
    PokemonListComponent,
    ShowcaseComponent,
  ],
  imports: [HttpClientModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
