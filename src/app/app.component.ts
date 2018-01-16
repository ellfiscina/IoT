import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { ConfigPage } from '../pages/config/config';

import { Globals } from './globals';

import { AuthProvider } from '../providers/auth/auth';
import { DistanceProvider } from '../providers/distance/distance';
import { TemperatureProvider } from '../providers/temperature/temperature';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  templateUrl: 'app.html',
  providers: [Globals],
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = HomePage;
  distancia;
  conf = true;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private auth: AuthProvider, public geolocation: Geolocation, private distance: DistanceProvider, public alertCtrl: AlertController, private temp: TemperatureProvider, private backgroundGeolocation: BackgroundGeolocation) {
    this.initializeApp();
    Globals.user = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):false;
    Globals.automatic = JSON.parse(localStorage.getItem("automatic"));
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
    if(this.platform.is('cordova')){
      const config: BackgroundGeolocationConfig = {
              desiredAccuracy: 10,
              stationaryRadius: 20,
              distanceFilter: 30,
              debug: true, //  enable this hear sounds for background-geolocation life-cycle.
              stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      };

      this.backgroundGeolocation.configure(config).subscribe((location: BackgroundGeolocationResponse) => {
        console.log("bg " + location);
      });

      this.backgroundGeolocation.start();
    }

    let watch = this.geolocation.watchPosition();
    if(Globals.user){
      watch.subscribe((data) => {
        this.distancia  = this.distance.haversine(data.coords.latitude, data.coords.longitude, Globals.user.lat, Globals.user.lng);
        if((this.distancia <= Globals.user.dist) && Globals.user.status == 0 && this.conf){
          if(Globals.automatic){
            this.showConfirm();
          }
          else{
            this.saveData();
            console.log("Ligado");
          }
        }
        else if(this.distancia > Globals.user.dist && !this.conf){
          this.conf = true;
        }
        console.log("Latitude: " + data.coords.latitude, "Longitude: " + data.coords.longitude);
        console.log("UserLatitude: " + Globals.user.lat, "UserLongitude: " + Globals.user.lng);
        console.log("dist: " + this.distancia + " km");
      },
      (error) => {
        console.log("Error: " + error.code, "Message: " + error.message);
      })
    }
  }

  showConfirm() {
      let confirm = this.alertCtrl.create({
        title: 'Ligar o ar condicionado?',
        message: 'Temperatura atual: ' + Globals.user.temperature + 'º',
        buttons: [
          {
            text: 'Não',
            handler: () => {
              console.log('Disagree clicked');
              this.conf = false;
            }
          },
          {
            text: 'Sim',
            handler: () => {
              this.saveData();
              console.log('Agree clicked');
            }
          }
        ]
      });
      confirm.present();
    }

   saveData(){
     this.temp.salvar(Globals.user.temperature, Globals.user.email);
   }


}
