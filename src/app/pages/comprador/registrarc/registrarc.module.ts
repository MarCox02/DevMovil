import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarcPageRoutingModule } from './registrarc-routing.module';

import { RegistrarcPage } from './registrarc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarcPageRoutingModule,
    FormsModule
  ],
  declarations: [RegistrarcPage]
})
export class RegistrarcPageModule {}

