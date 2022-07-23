import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { NgxsModule } from '@ngxs/store';
import { MainState } from 'src/app/state/main.state';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CharactersComponent } from './characters/characters.component';
import { DialogCharactersDatailComponent } from './characters/dialog-characters-datail/dialog-characters-datail.component';

@NgModule({
  declarations: [
    CharactersComponent,
    HomeComponent,
    DialogCharactersDatailComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgxsModule.forFeature([MainState]),
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }
