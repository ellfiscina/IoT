import { Component, OnInit } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { TemperatureProvider } from '../../providers/temperature/temperature';
import { Globals } from '../../app/globals';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{
	private numero: number;
  createSuccess = false;

  constructor(public navCtrl: NavController, private temp: TemperatureProvider, private alertCtrl: AlertController) {}

	ngOnInit() {
  		this.limpar()
  	}

  	limpar(){
  		this.numero = 15;
  	}

  calcular(operacao: string): void{
  	this.numero = this.temp.calcular(this.numero, operacao);
  }

  get display(): number {
  	return this.numero;
  }

  saveData(){
    console.log(this.numero.toString());

    //send data to provider
    if(this.temp.salvar(this.numero)){
      this.createSuccess = true;
      this.showPopup("Temperatura ajustada", "");
    }
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
