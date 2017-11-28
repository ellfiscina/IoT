import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { ConfigPage } from '../pages/config/config';


import {Globals} from './globals';

import {AuthProvider} from '../providers/auth/auth';
@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  templateUrl: 'app.html',
  providers: [Globals],
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = HomePage;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private auth: AuthProvider) {
    this.initializeApp();
    Globals.user = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):false;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openLogin() {
    this.nav.setRoot(LoginPage);
  }

  openHome() {
    this.nav.setRoot(HomePage);
  }

  openPerfil() {
    this.nav.setRoot(PerfilPage);
  }

  openConfig() {
    this.nav.setRoot(ConfigPage);
  }

  logout(){
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot(HomePage);
    });
  }

  get user(){
    return Globals.user;
  }
}
