import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


/*
  Generated class for the MybooksProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MybooksProvider {

  constructor() {
    console.log('Hello MybooksProvider Provider');
  }

  private books = {
    nome: "",
    autor: "",
    editora: "",
    idioma: "",
    edicao: "",
    ano: "",

}

private booksKey: string;

getBooksKey(){
  return this.booksKey;
}
setBooksKey( key: string){
  this.booksKey = key;
}

getBooks(){
  return this.books;
}

setBooks(nome: string, autor: string, editora: string, idioma: string, edicao: string, ano: string ){
    this.books.nome = nome;
    this.books.autor = autor;
    this.books.editora = editora;
    this.books.idioma = idioma;
    this.books.edicao = edicao;
    this.books.ano = ano;
  }

}
