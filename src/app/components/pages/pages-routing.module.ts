import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainResolver } from '../resolver/main.resolver';
import { CharactersComponent } from './characters/characters.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'characters',
    component: CharactersComponent,
    resolve: [MainResolver]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
