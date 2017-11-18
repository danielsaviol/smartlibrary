import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { MybooksProvider } from '../../providers/mybooks/mybooks';
import { ToastController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { EditBookPage } from '../edit-book/edit-book';
import { ExibirBookPage } from '../exibir-book/exibir-book';
import {AddBookPage} from '../add-book/add-book';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  books: Observable<any>;
  book: Array<string>;
  refBD: AngularFireDatabase;



  constructor(public alertCtrl: AlertController, public navCtrl: NavController,
     public navParams: NavParams, database : AngularFireDatabase, public afAuth: AngularFireAuth,
     public booka: MybooksProvider, public toastCtrl: ToastController,
     public actionSheetCtrl: ActionSheetController) {
     this.refBD = database;
     this.books = database.list("books/").valueChanges();
     
  }
  


 presentActionSheet(nome: string, autor: string, editora: string, idioma: string, edicao: string, ano: string ) {
    let actionSheet = this.actionSheetCtrl.create({
      title: nome,
      buttons: [
        {
          text: 'Exibir',
          handler: () => {
            this.exibirBook(nome, autor, editora, idioma, edicao, ano);
          }
        },{
          text: 'Editar',
          handler: () => {
            this.infoBook(nome, autor, editora, idioma, edicao, ano);
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }


  doRefresh(refresher) {
     console.log('Begin async operation', refresher);

     setTimeout(() => {
       console.log('Async operation has ended');
       refresher.complete();
     }, 1000);
   }


  infoBook(nome: string, autor: string, editora: string, idioma: string, edicao: string, ano: string ) {
    var refItem = this.refBD.list("books/");
    refItem.snapshotChanges([])
      .subscribe( filhos => {
        filhos.forEach( filho => {
          if(filho.payload.val().nome === nome){
            this.booka.setBooksKey(filho.key);
            console.log(filho.key);
          }
        });
      });
    this.booka.setBooks(nome, autor, editora, idioma, edicao, ano);
    this.navCtrl.push(EditBookPage);
  }

  exibirBook(nome: string, autor: string, editora: string, idioma: string, edicao: string, ano: string ) {
    var refItem = this.refBD.list("books/");
    refItem.snapshotChanges([])
      .subscribe( filhos => {
        filhos.forEach( filho => {
          if(filho.payload.val().nome === nome){
            this.booka.setBooksKey(filho.key);
            console.log(filho.key);
          }
        });
      });
    this.booka.setBooks(nome, autor, editora, idioma, edicao, ano);
    this.navCtrl.push(ExibirBookPage);
  }

  deleteAll(){
    var itensRef = this.refBD.list("books/");
    itensRef.remove();
  }

  deleteItem(nome: string){
    var refItem = this.refBD.list("books/");
    refItem.snapshotChanges([])
      .subscribe( filhos => {
        filhos.forEach( filho => {
          if(filho.payload.val().nome === nome){
            var itensRef = this.refBD.list("books/" +  filho.key);
            itensRef.remove();
            this.presentToast('Livro removido com sucesso')
            console.log(filho.key);
          }
        });
      });
  }

  presentToast( msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  showConfirm() {
      let confirm = this.alertCtrl.create({
        title: 'Delete All',
          message: 'Do you want to delete all books from the list? ',
            buttons: [
              {
                text: 'Disagree',
                handler: () => {
                  console.log('Disagree clicked');
                }
              },
              {
                text: 'Agree',
                handler: () => {
                  this.deleteAll();
                  console.log('Agree clicked');
                }
              }
            ]
          });
          confirm.present();
    }

  showAddBook(){
    this.navCtrl.push(AddBookPage);
  }

}
