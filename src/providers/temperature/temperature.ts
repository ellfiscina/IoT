import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Globals } from '../../app/globals';
import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
/*
  Generated class for the TemperatureProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TemperatureProvider {
	static readonly SOMA: string = '+';
  static readonly SUBTRACAO: string = '-';

  createSuccess = false;
  
  constructor(private http:HttpClient) {}

  calcular(num: number, operacao: string): number{
  	let resultado: number;
  	switch (operacao) {
  		case TemperatureProvider.SOMA:
  			if(num < 30){
  				++num;
  			}
  			break;
  		case TemperatureProvider.SUBTRACAO:
  			if(num > 15){
  				--num;
  			}
  			break;
  		
  		default:
  			num = 15;
  			break;
  	}
    
  	return num;
  }

  public salvar(value):Promise<any>{
    return this.http.get(Globals.apiUrl+"arduinoWrite.php?campo="+value).toPromise().then(data => {
          console.log(value);
        },
        error => {
          console.log(error);
        });
  }

  public ler(){
    return this.http.get(Globals.apiUrl+"arduinoRead.php").toPromise().then(resposta=>{return resposta});
  }
}
