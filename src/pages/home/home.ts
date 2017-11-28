import { Component, OnInit } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { TemperatureProvider } from '../../providers/temperature/temperature';
import { Globals } from '../../app/globals';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Globals],
})
export class HomePage implements OnInit{
	private numero: number;
  createSuccess = false;
  status = "off";

  constructor(public navCtrl: NavController, private temp: TemperatureProvider, private alertCtrl: AlertController, public geolocation: Geolocation) {
    Globals.user = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):false;
  }

	ngOnInit() {
  		this.read();
      this.getPosition();
      console.log(Globals.default); 
  	}

    /*isso aqui é pra ler o que tá no arquivo e substituir o numero que vai sofrer modificação*/
    read(){
      if(Globals.user){
        this.numero = Globals.user.temperature;
      }
      else{
        this.numero = Globals.default;
      }
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
    if(this.temp.salvar(this.numero, Globals.user.email)){
      this.createSuccess = true;
      this.showPopup("Temperatura ajustada", this.numero+"ºC");
    }
   // this.temp.arduino(Globals.user.email);
  }

  desligar(){
    if(this.temp.desligar(Globals.user.email)){
      this.createSuccess = true;
      this.showPopup("Temperatura ajustada", this.numero+"ºC");
    }
   // this.temp.arduino(Globals.user.email);
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

  get user(){
    var disable = Globals.user? false: true;
    return disable;
  }

  getPosition(){
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log("Latitude: " + data.coords.latitude, "Longitude: " + data.coords.longitude);
    },
    (error) => {
      console.log("Error: " + error.code, "Message: " + error.message);
    })
  }

}
