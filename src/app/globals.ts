import {Injectable, Input} from "@angular/core";
import {User} from "./user";
@Injectable()
export class Globals{
	static apiUrl: string = "http://localhost/profile/";
	static user: User;
}