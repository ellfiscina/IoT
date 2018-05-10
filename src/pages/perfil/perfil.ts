import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import { Globals } from '../../app/globals';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastProvider } from '../../providers/toast/toast';
import { DistanceProvider } from '../../providers/distance/distance';
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
	public inactiveEnd : boolean = true;
  createSuccess = false;
  data = Globals.user;
  show = true;
  automatic: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private auth: AuthProvider, private modalCtrl: ModalController, 
    private toast: ToastProvider, private distance: DistanceProvider,
    globals: Globals) {
      this.automatic = Globals.automatic;
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
       this.distance.salvar(Globals.user.dist, Globals.user.email);
       this.auth.updateUser(this.data).then(result => {
         this.toast.presentToast('Alterações salvas');
         this.inactiveEmail = true;
         this.inactiveNome = true;
         this.inactiveSenha = true;
         this.saveStorage();
       });
   }


  mapModal: Modal;
  showMap(){
    this.mapModal = this.modalCtrl.create(AddressMapPage);

    this.show = false;
    this.mapModal.present();
    this.mapModal.onDidDismiss((addr) => {
      this.show = true;
      this.data.endereco = addr.thoroughfare+', '+addr.subThoroughfare+'\n'+addr.subLocality+', '+addr.locality+', '+addr.administrativeArea+'\n'+addr.countryName+'\n'+addr.postalCode;
      this.inactiveEnd = false;
    })
  }

  saveStorage(){
    Globals.automatic = this.automatic;
    localStorage.setItem("automatic", JSON.stringify(this.automatic));
  }

  notify(){
    this.automatic;

    console.log(this.automatic);
  }
}
