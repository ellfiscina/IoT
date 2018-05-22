import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, 
         ViewController, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastProvider } from '../../providers/toast/toast'
import { LoginPage } from '../login/login';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

	registerCredentials = {email: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public view: ViewController, private auth: AuthProvider, 
    public menu: MenuController, private toast: ToastProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public novoCadastro() {
  	this.auth.register(this.registerCredentials).then(result => {
  		result.subscribe(success => {
        if(success){
    			this.toast.presentToast("Conta criada");
          this.navCtrl.push(LoginPage);
    		}
    		else{
    			this.toast.presentToast("Problem");	
    		}
    	},
    	error => {
    		this.toast.presentToast(error);
    	})
    });
  }
}
