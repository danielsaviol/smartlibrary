import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExibirBookPage } from './exibir-book';

@NgModule({
  declarations: [
    ExibirBookPage,
  ],
  imports: [
    IonicPageModule.forChild(ExibirBookPage),
  ],
})
export class ExibirBookPageModule {}
