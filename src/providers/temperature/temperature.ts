import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TemperatureProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TemperatureProvider {
	static readonly SOMA: string = '+';
  	static readonly SUBTRACAO: string = '-';

  constructor() {}

  calcular(num: number, operacao: string): number{
  	let resultado: number;
  	switch (operacao) {
  		case TemperatureProvider.SOMA:
  			if(num == 30){
  				resultado = num;
  			}
  			else{
  				resultado = num + 1;
  			}
  			break;
  		case TemperatureProvider.SUBTRACAO:
  			if(num == 15){
  				resultado = 15;
  			}
  			else{
  				resultado = num - 1;
  			}
  			break;
  		
  		default:
  			resultado = 15;
  			break;
  	}
  	return resultado;
  }
}
