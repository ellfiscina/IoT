import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Globals } from '../../app/globals';
/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
  providers: [Globals],
})
export class PerfilPage {
	public inactiveNome : boolean = true;
	public inactiveEmail : boolean = true;
	public inactiveSenha : boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, globals: Globals) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  get user(){
  	return Globals.user;
  }

  edit(tipo){
  	if(tipo == 'nome'){
  		this.inactiveNome = false;
  		this.inactiveEmail = true;
  	}
  	else if(tipo == 'email'){
  		this.inactiveEmail = false;
  		this.inactiveNome = true;
  	}
  	else if(tipo == 'senha'){
  		this.inactiveSenha = false;
  	}
  }
}
