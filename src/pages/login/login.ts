import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, Loading, MenuController } from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { MyApp } from '../../app/app.component';
import { AuthProvider } from '../../providers/auth/auth';
import { Globals } from '../../app/globals';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Globals]
})
export class LoginPage {

  loading: Loading;
  registerCredentials = {email: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, private auth: AuthProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public menu: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  showCadastro(){
  	this.navCtrl.push(RegisterPage);
  }

  public login(){
      this.showLoading()
      this.auth.login(this.registerCredentials).then(allow => {
        allow
        .subscribe((allowed) => {
          if(allowed){
            this.navCtrl.push(MyApp);
          }
          else{
            this.showError("Access Denied");
          }
        },
        error => {
          this.showError(error);
        }
        )
      });
    }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text){
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
