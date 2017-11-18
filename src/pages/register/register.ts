import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

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

  createSuccess = false;
	registerCredentials = {email: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, private auth: AuthProvider, private alertCtrl: AlertController, public menu: MenuController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public novoCadastro() {
  	this.auth.register(this.registerCredentials).then(result => {
  		result.subscribe(success => {
        if(success){
    			this.createSuccess = true;
    			this.showPopup("Success", "Account created");
    		}
    		else{
    			this.showPopup("Error", "Problem");	
    		}
    	},
    	error => {
    		this.showPopup("Error", error);
    	})
    });
  }

  showPopup(title, text){
  	let alert = this.alertCtrl.create({
  		title: title,
  		subTitle: text,
  		buttons: [
  		{
  			text: 'OK',
  			handler: data => {
  				if(this.createSuccess){
  					this.navCtrl.popToRoot();
  				}
  			}
  		}
  		]
  	});
  	alert.present();

  }
}
