import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {GoogleMaps, GoogleMap, GoogleMapOptions, GoogleMapsEvent} from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

@IonicPage()
@Component({
  selector: 'page-address-map',
  templateUrl: 'address-map.html',
  providers: []
})
export class AddressMapPage implements OnInit{

	map: GoogleMap;
  address: Object;
	constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private geocoder: NativeGeocoder, public viewCtrl: ViewController){

	}

	ngOnInit(){
    this.loadMap();
	}

	loadMap(){
    this.geolocation.getCurrentPosition().then((resp) => {
     let mapOptions: GoogleMapOptions = {
         camera: {
           target: {
             lat: resp.coords.latitude,
             lng: resp.coords.longitude
           },
           zoom: 17,
           tilt: 30
         }
       };
       this.map = GoogleMaps.create('map_canvas', mapOptions);

       // Wait the MAP_READY before using any methods.
       this.map.one(GoogleMapsEvent.MAP_READY)
         .then(() => {  
           // Now you can use all methods safely.
           this.map.addMarker({
               title: 'Localização',
               icon: 'orange',
               animation: 'DROP',
               snippet: '',
               position: {
                 lat: resp.coords.latitude,
                 lng: resp.coords.longitude
               }
             })
           .then(marker => {
             this.geocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude).then(addr => {
                 this.address = addr;
                 marker.setSnippet(addr.thoroughfare+', '+addr.subThoroughfare+'\n'+addr.subLocality+', '+addr.locality+', '+addr.administrativeArea+'\n'+addr.countryName+'\n'+addr.postalCode);
                 marker.showInfoWindow();
               },
               error => {
                 alert(JSON.stringify(error));
               });
             this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(coords => {
               marker.setPosition(coords[0]);
               //alert(JSON.stringify(coords[0]));
               this.geocoder.reverseGeocode(coords[0].lat, coords[0].lng).then(addr => {
                 this.address = addr;
                 marker.setSnippet(addr.thoroughfare+', '+addr.subThoroughfare+'\n'+addr.subLocality+', '+addr.locality+', '+addr.administrativeArea+'\n'+addr.countryName+'\n'+addr.postalCode);
                 marker.showInfoWindow();
               },
               error => {
                 alert(JSON.stringify(error));
               });
             });
           })
         }, error => {
           alert(error.message);
         });
    }).catch((error) => {
      alert(error.message);
      console.log(error);
    });
  
}
dismiss(){
  this.viewCtrl.dismiss(this.address);
}
}