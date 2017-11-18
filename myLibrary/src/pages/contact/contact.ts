import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { WishlistProvider } from '../../providers/wishlist/wishlist';
import { ToastController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { EditWishlistPage } from '../edit-wishlist/edit-wishlist';
import { ExibirWishlistPage } from '../exibir-wishlist/exibir-wishlist';
import {AddWishlistPage} from '../add-wishlist/add-wishlist';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  wishlists: Observable<any>;
  wishlist: Array<string>;
  refBD: AngularFireDatabase;



  //refItem: AngularFireObject<any>;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController,
     public navParams: NavParams, database : AngularFireDatabase, public afAuth: AngularFireAuth,
     public wishlista: WishlistProvider, public toastCtrl: ToastController,
     public actionSheetCtrl: ActionSheetController) {
     this.refBD = database;
     this.wishlists = database.list("wishlist/").valueChanges();
  }


  presentActionSheet(nome: string, autor: string, editora: string, idioma: string, edicao: string, ano: string ) {
    let actionSheet = this.actionSheetCtrl.create({
      title: nome,
      buttons: [
        {
          text: 'Exibir',
          handler: () => {
            this.ExibirWishlist(nome, autor, editora, idioma, edicao, ano);
          }
        },{
          text: 'Editar',
          handler: () => {
            this.infoWishlist(nome, autor, editora, idioma, edicao, ano);
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
    console.log('ionViewDidLoad ContactPage');
  }


  doRefresh(refresher) {
     console.log('Begin async operation', refresher);

     setTimeout(() => {
       console.log('Async operation has ended');
       refresher.complete();
     }, 1000);
   }


  infoWishlist(nome: string, autor: string, editora: string, idioma: string, edicao: string, ano: string ) {
    var refItem = this.refBD.list("wishlist/");
    refItem.snapshotChanges([])
      .subscribe( filhos => {
        filhos.forEach( filho => {
          if(filho.payload.val().nome === nome){
            this.wishlista.setWishlistKey(filho.key);
            console.log(filho.key);
          }
        });
      });
    this.wishlista.setWishlist(nome, autor, editora, idioma, edicao, ano);
    this.navCtrl.push(EditWishlistPage);
  }

  ExibirWishlist(nome: string, autor: string, editora: string, idioma: string, edicao: string, ano: string ) {
    var refItem = this.refBD.list("wishlist/");
    refItem.snapshotChanges([])
      .subscribe( filhos => {
        filhos.forEach( filho => {
          if(filho.payload.val().nome === nome){
            this.wishlista.setWishlistKey(filho.key);
            console.log(filho.key);
          }
        });
      });
    this.wishlista.setWishlist(nome, autor, editora, idioma, edicao, ano);
    this.navCtrl.push(ExibirWishlistPage);
  }

  deleteAll(){
    var itensRef = this.refBD.list("wishlist/");
    itensRef.remove();
  }

  deleteItem(nome: string){
    var refItem = this.refBD.list("wishlist/");
    refItem.snapshotChanges([])
      .subscribe( filhos => {
        filhos.forEach( filho => {
          if(filho.payload.val().nome === nome){
            var itensRef = this.refBD.list("wishlist/" +  filho.key);
            itensRef.remove();
            this.presentToast('Lista removida com sucesso')
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
          message: 'Do you want to delete all wishlist from the list? ',
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


  showAddWishlist(){
    this.navCtrl.push(AddWishlistPage);
  }


}
