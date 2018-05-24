import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../../app/globals';
/*
  Generated class for the DistanceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DistanceProvider {

  constructor(public http: HttpClient) {
  }

  public haversine(lat1: number, lon1: number, lat2: number, lon2: number): number{
  	let pi = Math.PI;
  	let R = 6372.8;

  	lat1 = lat1*pi/180;
  	lon1 = lon1*pi/180;
  	lat2 = lat2*pi/180;
  	lon2 = lon2*pi/180;

  	let dLat = lat2 - lat1;
  	let dLon = lon2 - lon1;
  	let a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
  	let c = 2 * Math.asin(Math.sqrt(a));

  	return R * c;
  }

  public salvar(value, email):Promise<any>{
    return this.http.get(Globals.apiUrl+"setDistance.php?dist="+value+"&email="+email).toPromise().then(
        data => {
          Globals.user.dist = value;
          localStorage.setItem("user", JSON.stringify(Globals.user));
          console.log("OI");
          console.log(data);
          console.log(email + " " + value);
        },
        error => {
          console.log(error);
        });
  }
}
