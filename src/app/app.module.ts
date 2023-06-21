import { PokemonIndividualComponent } from './component/pokemon-individual/pokemon-individual.component';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PokemonListComponent } from './component/pokemon-list/pokemon-list.component';
import { PokedexHeaderComponent } from './component/pokedex-header/pokedex-header.component';
import { ShowcaseComponent } from './component/showcase/showcase.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokeMonDetailComponent } from './component/poke-mon-detail/poke-mon-detail.component';

const routes: Routes = [
  { path: '', component: ShowcaseComponent },
  { path: ':name', component: PokeMonDetailComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PokedexHeaderComponent,
    PokemonListComponent,
    ShowcaseComponent,
    PokeMonDetailComponent,
    PokemonIndividualComponent,
  ],

  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
