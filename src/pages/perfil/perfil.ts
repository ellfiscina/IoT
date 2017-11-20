import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Modal } from 'ionic-angular';
import { Globals } from '../../app/globals';
import { AuthProvider } from '../../providers/auth/auth';
import { AddressMapPage } from '../address-map/address-map';
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
  createSuccess = false;
  data = Globals.user;
  show = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, globals: Globals, private auth: AuthProvider, private alertCtrl: AlertController, private modalCtrl: ModalController) {
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

  updateUser(){
       console.log(this.data);
       this.auth.updateUser(this.data).then(result => {
         console.log("ok");
         this.inactiveEmail = true;
         this.inactiveNome = true;
         this.inactiveSenha = true;
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

  mapModal: Modal;
  showMap(){
    this.mapModal = this.modalCtrl.create(AddressMapPage);

    this.show = false;
    this.mapModal.present();
    this.mapModal.onDidDismiss((addr) => {
      this.show = true;
      this.data.endereco = addr.thoroughfare+', '+addr.subThoroughfare+'\n'+addr.subLocality+', '+addr.locality+', '+addr.administrativeArea+'\n'+addr.countryName+'\n'+addr.postalCode;
    })
  }
}
