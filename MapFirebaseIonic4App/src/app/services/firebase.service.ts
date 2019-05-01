import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { Location } from '../models/location.model';
import 'firebase/storage';
import 'rxjs-compat/add/operator/map';
import { Observable } from 'rxjs-compat/Observable';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
    private static locationListRef;
    locationListReg = this.db.list<Location>('Buildings');
    public currentLocation: Location;
    public static buildingLocation: Location;

    public static buildingCode: string;

    static setBuildingCode(bCode: string) {
        bCode = bCode.replace(/[0-9]/g, '');
        bCode = bCode.replace(' ', '');
        bCode = bCode.toUpperCase();
        console.log(bCode);
        this.buildingCode = bCode;
    }
    static getBuildingCode() {
        return this.buildingCode;
    }

    static checkBuilding() {
        //console.log(this.getBuildingCode() + " " + this.locationListRef);
        //this.setBuildingLocation(this.locationListRef.equalTo(this.getBuildingCode));
        this.getLocationsList().valueChanges().subscribe(res => {
            for (let item of res) {
                if (item.Key == this.getBuildingCode()) {
                    console.log("Value matched: " + this.getBuildingCode());
                    this.buildingLocation = item;
                }
                else {
                    //console.log("NOT A MATCH: " + item.Key);
                }
                //this.addMarker(item);
                //this.position = new google.maps.LatLng(item.Lat, item.Long);
                //this.map.setCenter(this.position);
            }
        });
    }
    static setBuildingLocation(loc: Location) {
        this.buildingLocation = loc;
    }
    static getBuildingLocation() {
        return this.buildingLocation;
    }

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }
  setCurrentLocation(location: Location){
    this.currentLocation = location;
  }
  getCurrentLocation(){
    return this.currentLocation;
  }
  static getLocationsList(){
    return this.locationListRef;
    }
}
