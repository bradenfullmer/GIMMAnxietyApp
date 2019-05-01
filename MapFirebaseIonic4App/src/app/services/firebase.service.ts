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
    private locationListRef = this.db.list<Location>('Buildings');
    public currentLocation: Location;
    public buildingLocation: Location;

    private static newLocList: Array<Location>;

    public static staticBuilding: Location;

    public buildingCode: string;

    setBuildingCode(bCode: string) {
        bCode = bCode.replace(/[0-9]/g, '');
        bCode = bCode.replace(' ', '');
        bCode = bCode.toUpperCase();
        console.log(bCode);
        this.buildingCode = bCode;
    }
    getBuildingCode() {
        return this.buildingCode;
    }

    checkBuilding() {
        console.log(this.getBuildingCode() + " " + this.locationListRef);
        //this.setBuildingLocation(this.locationListRef.equalTo(this.getBuildingCode));
        
        this.getLocationsList().valueChanges().subscribe(res => {
            for (let item of res) {
              console.log("hello");
                if (item.Key == this.getBuildingCode()) {
                    console.log("Value matched: " + this.getBuildingCode());
                    this.setBuildingLocation(item);
                    console.log(this.getBuildingLocation());
                    FirebaseService.newLocList.length = 0;
                    FirebaseService.newLocList.push(item);
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
    setBuildingLocation(loc: Location) {
        this.buildingLocation = loc;
        FirebaseService.staticBuilding = loc;
        console.log("The Static building is: " + FirebaseService.staticBuilding);
    }

    getBuildingLocation() {
        return this.buildingLocation;
    }

    public static getStaticLocation() {
        return FirebaseService.staticBuilding;
    }

    constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }
  setCurrentLocation(location: Location){
    this.currentLocation = location;
  }
  getCurrentLocation(){
    return this.currentLocation;
  }
  getLocationsList(){
    return this.locationListRef;
    }

    public static getPosList() {
        return FirebaseService.newLocList;
    }

    addCurrentLoc(curPos) {
        //this.currentLocation.Key = "QWERTY";
        this.currentLocation.BuildingName = "Your Location";
        this.currentLocation.Lat = curPos.latitude;
        this.currentLocation.Long = curPos.longitude;

        console.log(this.currentLocation);

        FirebaseService.newLocList.push(this.currentLocation);
    }
}
