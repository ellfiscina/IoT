import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DistanceProvider } from '../../providers/distance/distance';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private distance: DistanceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
  }

  saveDist(){
    this.distance.salvar(this.dist, Globals.user.email);
  }
}
