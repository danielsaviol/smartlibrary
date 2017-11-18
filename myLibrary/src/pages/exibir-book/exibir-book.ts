import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MybooksProvider } from '../../providers/mybooks/mybooks';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {  NgForm } from '@angular/forms';
import {AboutPage} from '../about/about';

/**
 * Generated class for the ExibirBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exibir-book',
  templateUrl: 'exibir-book.html',
})
export class ExibirBookPage {

  public infoBook = {
    nome: "",
    autor: "",
    editora: "",
    idioma: "",
    edicao: "",
    ano: "",
}


refBD: AngularFireDatabase;



constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public book: MybooksProvider, database : AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.infoBook = this.book.getBooks();
    console.log(this.book.getBooksKey())
    this.refBD = database;
    /*this.afAuth.authState.subscribe( user => {
          this.userid = user.uid;
    })*/
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExibirBookPage');
  }

  form_edit(f: NgForm) {
    if (!f.valid) {
      return;
    } console.log(f.controls.nome.value, f.controls.autor.value, f.controls.editora.value, f.controls.idioma.value, f.controls.edicao.value, f.controls.ano.value)
    this.editItem(f.controls.nome.value, f.controls.autor.value, f.controls.editora.value, f.controls.idioma.value, f.controls.edicao.value, f.controls.ano.value);
  }



editItem(nome: string, autor: string, editora: string, idioma: string, edicao: string, ano: string ){
   console.log(this.book.getBooksKey())
  
    var itensRef;
    itensRef = this.refBD.object("books/"  +  this.book.getBooksKey());
    itensRef.update({ nome : nome});
    itensRef.update({ autor : autor});
    itensRef.update({ editora : editora});
    itensRef.update({ idioma : idioma});
    itensRef.update({ edicao : edicao});
    itensRef.update({ ano : ano});
    this.book.setBooks(nome, autor, editora, idioma, edicao, ano);
    this.navCtrl.push(AboutPage);

}


}
