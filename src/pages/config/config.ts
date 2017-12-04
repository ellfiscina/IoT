import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DistanceProvider } from '../../providers/distance/distance';
import { ToastProvider } from '../../providers/toast/toast';
import { Globals } from '../../app/globals';

/**
 * Generated class for the ConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
  providers: [Globals]
})
export class ConfigPage {
	dist: number;
  automatic: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private distance: DistanceProvider, private toast: ToastProvider) {
    this.automatic = Globals.automatic;
    console.log("inicio " + this.automatic);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
  }

  saveDist(){
    this.distance.salvar(this.dist, Globals.user.email);
    this.toast.presentToast('Alterações salvas');
  }

  change(){
    this.automatic;
    Globals.automatic = this.automatic;
    localStorage.setItem("automatic", JSON.stringify(Globals.automatic));
    console.log(this.automatic);
  }

}
