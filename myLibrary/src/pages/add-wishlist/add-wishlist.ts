import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {ContactPage} from '../contact/contact';

/**
 * Generated class for the AddWishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-wishlist',
  templateUrl: 'add-wishlist.html',
})
export class AddWishlistPage {

  private wishlistForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase,
    public fb: FormBuilder, public toastCtrl: ToastController, public afAuth: AngularFireAuth
    ) {

this.wishlistForm = fb.group({


'nome': ['', [Validators.required]],
'autor': ['', [Validators.required]],
'editora': [],
'idioma': [],
'edicao': [],
'ano': [],
});
}

ionViewDidLoad() {
console.log('ionViewDidLoad AddWishlistPage');
}




form_submit() {

console.log(this.wishlistForm.value.nome);

this.database.list("wishlist/").push({
 nome: this.wishlistForm.value.nome,
 autor: this.wishlistForm.value.autor,
 editora: this.wishlistForm.value.editora,
 idioma: this.wishlistForm.value.idioma,
 edicao: this.wishlistForm.value.edicao,
 ano: this.wishlistForm.value.ano,
 }).then((t: any) => console.log('dados gravados: '+ t.key)), (e: any) => console.log(e.message);
 this.wishlistForm.reset();
 this.navCtrl.push(ContactPage)
 this.presentToast();

}

presentToast() {
let toast = this.toastCtrl.create({
message: 'Wishlist cadastrada com sucesso! ',
duration: 1000
});
toast.present();
}


}
