import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressMapPage } from './address-map';

@NgModule({
  declarations: [
    AddressMapPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressMapPage),
  ],
})
export class AddressMapPageModule {}
