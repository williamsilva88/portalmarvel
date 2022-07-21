import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    LayoutModule,
    MatGridListModule,
    FlexLayoutModule,
    MatIconModule
  ],
  exports:[
    MatCardModule,
    LayoutModule,
    MatGridListModule,
    FlexLayoutModule,
    MatIconModule
  ]
})
export class MaterialModule { }
