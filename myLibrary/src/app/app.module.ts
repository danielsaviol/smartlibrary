import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {AddWishlistPage} from '../pages/add-wishlist/add-wishlist';
import {AddBookPage} from '../pages/add-book/add-book';
import {EditBookPage} from '../pages/edit-book/edit-book';
import {EditWishlistPage} from '../pages/edit-wishlist/edit-wishlist';
import {ExibirBookPage} from '../pages/exibir-book/exibir-book';
import {ExibirWishlistPage} from '../pages/exibir-wishlist/exibir-wishlist';


import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import {FormsModule} from '@angular/forms';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WishlistProvider } from '../providers/wishlist/wishlist';
import { MybooksProvider } from '../providers/mybooks/mybooks';

var config = {
  apiKey: "AIzaSyCXiCrcB2wZEWvXXmFzCPs7rpvrHhtOTUQ",
  authDomain: "my-library-aa7a2.firebaseapp.com",
  databaseURL: "https://my-library-aa7a2.firebaseio.com",
  projectId: "my-library-aa7a2",
  storageBucket: "my-library-aa7a2.appspot.com",
  messagingSenderId: "449225521579"
};



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddBookPage,
    AddWishlistPage,
    EditBookPage,
    EditWishlistPage,
    ExibirBookPage,
    ExibirWishlistPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddWishlistPage,
    AddBookPage,
    EditBookPage,
    EditWishlistPage,
    ExibirBookPage,
    ExibirWishlistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WishlistProvider,
    MybooksProvider
  ]
})
export class AppModule {}
