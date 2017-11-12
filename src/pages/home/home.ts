import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TemperatureProvider } from '../../providers/temperature/temperature';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{
	private numero: number;

  constructor(public navCtrl: NavController, private temp: TemperatureProvider) {}

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
}
