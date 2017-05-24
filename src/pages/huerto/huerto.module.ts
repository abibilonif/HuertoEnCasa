import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HuertoPage } from './huerto';

@NgModule({
  declarations: [
    HuertoPage,
  ],
  imports: [
    IonicPageModule.forChild(HuertoPage),
  ],
  exports: [
    HuertoPage
  ]
})
export class HuertoPageModule {}
