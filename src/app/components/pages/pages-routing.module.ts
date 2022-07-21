import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainResolver } from '../resolver/main.resolver';
import { HomeComponent } from './home/home.component';
import { PersonagensComponent } from './personagens/personagens.component';

const routes: Routes = [
  {
    path: 'personagens',
    component: PersonagensComponent,
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
