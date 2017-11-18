import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddWishlistPage } from './add-wishlist';

@NgModule({
  declarations: [
    AddWishlistPage,
  ],
  imports: [
    IonicPageModule.forChild(AddWishlistPage),
  ],
})
export class AddWishlistPageModule {}
