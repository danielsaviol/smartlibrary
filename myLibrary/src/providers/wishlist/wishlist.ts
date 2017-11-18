import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the WishlistProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WishlistProvider {

  constructor() {
    console.log('Hello WishlistProvider Provider');
  }

  private wishlist = {
    nome: "",
    autor: "",
    editora: "",
    idioma: "",
    edicao: "",
    ano: "",

}

private wishlistKey: string;

getWishlistKey(){
  return this.wishlistKey;
}
setWishlistKey( key: string){
  this.wishlistKey = key;
}

getWishlist(){
  return this.wishlist;
}

setWishlist(nome: string, autor: string, editora: string, idioma: string, edicao: string, ano: string ){
    this.wishlist.nome = nome;
    this.wishlist.autor = autor;
    this.wishlist.editora = editora;
    this.wishlist.idioma = idioma;
    this.wishlist.edicao = edicao;
    this.wishlist.ano = ano;
  }


}
