import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WishlistProvider } from '../../providers/wishlist/wishlist';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {  NgForm } from '@angular/forms';
import {ContactPage} from '../contact/contact';

/**
 * Generated class for the ExibirWishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exibir-wishlist',
  templateUrl: 'exibir-wishlist.html',
})
export class ExibirWishlistPage {

  public infoWishlist = {
    nome: "",
    autor: "",
    editora: "",
    idioma: "",
    edicao: "",
    ano: "",
}


refBD: AngularFireDatabase;



constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public wishlist: WishlistProvider, database : AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.infoWishlist = this.wishlist.getWishlist();
    console.log(this.wishlist.getWishlistKey())
    this.refBD = database;
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExibirWishlistPage');
  }

  form_edit(f: NgForm) {
    if (!f.valid) {
      return;
    } console.log(f.controls.nome.value, f.controls.autor.value, f.controls.editora.value, f.controls.idioma.value, f.controls.edicao.value, f.controls.ano.value)
    this.editItem(f.controls.nome.value, f.controls.autor.value, f.controls.editora.value, f.controls.idioma.value, f.controls.edicao.value, f.controls.ano.value);
  }



editItem(nome: string, autor: string, editora: string, idioma: string, edicao: string, ano: string ){
   console.log(this.wishlist.getWishlistKey())
  
    var itensRef;
    itensRef = this.refBD.object("wishlist/"  +  this.wishlist.getWishlistKey());
    itensRef.update({ nome : nome});
    itensRef.update({ autor : autor});
    itensRef.update({ editora : editora});
    itensRef.update({ idioma : idioma});
    itensRef.update({ edicao : edicao});
    itensRef.update({ ano : ano});
    this.wishlist.setWishlist(nome, autor, editora, idioma, edicao, ano);
    this.navCtrl.push(ContactPage);

}

}
