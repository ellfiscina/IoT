import { Component, OnInit } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { TemperatureProvider } from '../../providers/temperature/temperature';
import { Globals } from '../../app/globals';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Globals],
})
export class HomePage implements OnInit{
	private numero: number;
  createSuccess = false;

  constructor(public navCtrl: NavController, private temp: TemperatureProvider, private alertCtrl: AlertController) {
    Globals.user = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):false;
  }

	ngOnInit() {
  		//this.read();
      this.limpar();
  	}

    /*isso aqui é pra ler o que tá no arquivo e substituir o numero que vai sofrer modificação*/
    read(){
      this.numero = parseInt(JSON.stringify(this.temp.ler())); //isso foi eu tentando trasformar em number
      console.log(this.numero);
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
      this.showPopup("Temperatura ajustada", this.numero+"ºC");
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

  user(){
    var disable = Globals.user? false: true;
    return disable;
  }
}
