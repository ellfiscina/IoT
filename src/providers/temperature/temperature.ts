import { HttpClient } from '@angular/common/http';
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
  			num = Globals.default;
  			break;
  	}
    
  	return num;
  }

  public salvar(value, email):Promise<any>{
    return this.http.get(Globals.apiUrl+"setTemperature.php?temperature="+value+"&email="+email+"&status=1").toPromise().then(
        data => {
          Globals.user.temperature = value;
          Globals.user.status = 1;
          localStorage.setItem("user", JSON.stringify(Globals.user));
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  public desligar(email):Promise<any>{
    return this.http.get(Globals.apiUrl+"setTemperature.php?temperature="+Globals.user.temperature+"&email="+email+"&status=0").toPromise().then(
        data => {
          Globals.user.status = 0;
          localStorage.setItem("user", JSON.stringify(Globals.user));
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  public arduino(value):Promise<any>{
    return this.http.get(Globals.apiUrl+"arduinoRead.php?email="+value).toPromise().then(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
