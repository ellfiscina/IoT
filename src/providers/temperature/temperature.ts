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

  constructor(private http:HttpClient) {}

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

  public salvar(value):Promise<any>{
    if(value === null){
      return Promise.resolve(Observable.throw("Insert credentials"));
    }
    else{
      return this.http.post(Globals.apiUrl+"arduino.php", JSON.stringify(value)).toPromise().then(
        result => { 
          return Observable.create(observer =>{
            observer.next(true);
            observer.complete();
          });  
        }
        );
    }
  }
}
