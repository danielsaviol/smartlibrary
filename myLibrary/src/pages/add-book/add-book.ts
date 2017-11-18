import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AboutPage} from '../about/about';

/**
 * Generated class for the AddBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-book',
  templateUrl: 'add-book.html',
})
export class AddBookPage {

  private booksForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase,
    public fb: FormBuilder, public toastCtrl: ToastController, public afAuth: AngularFireAuth
    ) {

this.booksForm = fb.group({


'nome': ['', [Validators.required]],
'autor': ['', [Validators.required]],
'editora': [],
'idioma': [],
'edicao': [],
'ano': [],
});
}

ionViewDidLoad() {
console.log('ionViewDidLoad AddBookPage');
}




form_submit() {

console.log(this.booksForm.value.nome);

this.database.list("books/").push({
 nome: this.booksForm.value.nome,
 autor: this.booksForm.value.autor,
 editora: this.booksForm.value.editora,
 idioma: this.booksForm.value.idioma,
 edicao: this.booksForm.value.edicao,
 ano: this.booksForm.value.ano,
 }).then((t: any) => console.log('dados gravados: '+ t.key)), (e: any) => console.log(e.message);
 this.booksForm.reset();
 this.navCtrl.push(AboutPage)
 this.presentToast();

}

presentToast() {
let toast = this.toastCtrl.create({
message: 'Livro cadastrado com sucesso! ',
duration: 1000
});
toast.present();
}


}
