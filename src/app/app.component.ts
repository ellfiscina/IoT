import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { ConfigPage } from '../pages/config/config';

import { Globals } from './globals';

import { AuthProvider } from '../providers/auth/auth';
import { DistanceProvider } from '../providers/distance/distance';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  templateUrl: 'app.html',
  providers: [Globals],
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = HomePage;
  distancia: number;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private auth: AuthProvider, public geolocation: Geolocation, private distance: DistanceProvider) {
    this.initializeApp();
    Globals.user = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):false;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getPosition();
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

  getPosition(){
    let watch = this.geolocation.watchPosition();
    if(Globals.user){
      watch.subscribe((data) => {
        this.distancia  = this.distance.haversine(data.coords.latitude, data.coords.longitude, Globals.user.lat, Globals.user.lng);
        console.log("Latitude: " + data.coords.latitude, "Longitude: " + data.coords.longitude);
        console.log(this.distancia + " km");
      },
      (error) => {
        console.log("Error: " + error.code, "Message: " + error.message);
      })
    }
  }

}
