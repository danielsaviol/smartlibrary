import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExibirWishlistPage } from './exibir-wishlist';

@NgModule({
  declarations: [
    ExibirWishlistPage,
  ],
  imports: [
    IonicPageModule.forChild(ExibirWishlistPage),
  ],
})
export class ExibirWishlistPageModule {}
