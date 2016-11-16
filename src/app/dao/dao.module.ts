import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaoService } from "./dao.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [DaoService]
})
export class DaoModule { }
