import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatRippleModule} from "@angular/material/core";


@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatRippleModule,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ]
})
export class SharedModule { }
