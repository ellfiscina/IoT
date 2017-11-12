 import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http'
import { Globals } from '../../app/globals';
import { User } from '../../app/user';
import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class AuthProvider {
	public login(credentials):Promise<any>{
		if(credentials.email === null || credentials.password === null){
			return Promise.resolve(Observable.throw("Insert credentials"));
		}
		else{
			return this.http.post(Globals.apiUrl+"login.php", JSON.stringify({email: credentials.email, senha: credentials.password})).toPromise().then(
				result => { 
						return Observable.create(observer =>{
							let access = result?true:false;
							if(access){
								Globals.user = result[0] as User;
								localStorage.setItem("user", JSON.stringify(Globals.user));
							}
							observer.next(access);
							observer.complete();
						});	
						}
				)
		}
	}

	public register(credentials):Promise<any>{
		if(credentials.email === null || credentials.password === null){
			return Promise.resolve(Observable.throw("Insert credentials"));
		}
		else{
			if(credentials.password != credentials.passwordConf) 
				return Promise.resolve(Observable.throw("Senha e confirmação não são iguais!"));
			let regex = /^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/;
			if(!regex.test(credentials.email))
				return Promise.resolve(Observable.throw("E-mail inválido!"));
			let params = {email: credentials.email, senha: credentials.password, telefone: credentials.telefone, nome: credentials.nome};
			return this.http.post(Globals.apiUrl+"signup.php", JSON.stringify(params)).toPromise().then(
				result => { 
						return Observable.create(observer =>{
							observer.next(true);
							observer.complete();
						});	
						}
				);
		}
	}

	public getUserInfo(): User{		
		Globals.user = new User();
		return Globals.user;
	}

	public logout(){
		return Observable.create(observer => {
			Globals.user= null;
			localStorage.setItem("user", null);
			observer.next(true);
			observer.complete();
		});
	}
  constructor(private http:HttpClient) { }

}
