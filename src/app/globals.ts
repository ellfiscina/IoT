import {Injectable} from "@angular/core";
import {User} from "./user";
@Injectable()
export class Globals{
	//static apiUrl: string = "http://localhost/profile/";
	static apiUrl: string = "https://lank-lifetime.000webhostapp.com/";
	static user: User;
	static default: number = 25;
	static automatic: boolean = false;
}