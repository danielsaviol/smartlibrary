import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditWishlistPage } from './edit-wishlist';

@NgModule({
  declarations: [
    EditWishlistPage,
  ],
  imports: [
    IonicPageModule.forChild(EditWishlistPage),
  ],
})
export class EditWishlistPageModule {}
