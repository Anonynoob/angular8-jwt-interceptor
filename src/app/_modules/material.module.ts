import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Material from '@angular/material';
import { MatDatepickerModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    Material.MatButtonModule,
    Material.MatCheckboxModule,
    Material.MatAutocompleteModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatIconModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatCheckboxModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    CommonModule
  ],
  exports: [
    Material.MatButtonModule,
    Material.MatCheckboxModule,
    Material.MatAutocompleteModule,
    Material.MatFormFieldModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatInputModule,
    Material.MatIconModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatCheckboxModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
  ]
})
export class MaterialModule { }
