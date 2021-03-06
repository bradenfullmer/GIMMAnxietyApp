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

    private static newLocList: Array<Location> = new Array<Location>();

    public static staticBuilding: Location;

    public static buildingCode: string;

    setBuildingCode(bCode: string) {
        bCode = bCode.replace(/[0-9]/g, '');
        bCode = bCode.replace(' ', '');
        bCode = bCode.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
        bCode = bCode.toUpperCase();
        console.log(bCode);
        FirebaseService.buildingCode = bCode;
    }
    getBuildingCode() {
        return FirebaseService.buildingCode;
    }
    public static resetList() {
        FirebaseService.newLocList.splice(0, FirebaseService.newLocList.length - 1);
    }

    checkBuilding() {
        //console.log(this.getBuildingCode() + " " + this.locationListRef);
        //FirebaseService.newLocList = new Array<Location>();
        //this.setBuildingLocation(this.locationListRef.equalTo(this.getBuildingCode));
        var matched = false;
        FirebaseService.resetList();

        this.getLocationsList().valueChanges().subscribe(res => {
            for (let item of res) {
              //console.log("hello");
                if (item.Key == this.getBuildingCode()) {
                    console.log("Value matched: " + this.getBuildingCode());
                    this.setBuildingLocation(item);
                    console.log(this.getBuildingLocation());
                    FirebaseService.newLocList.push(item);
                    matched = true;
                }
                else {
                    //console.log("NOT A MATCH: " + item.Key);
                }
                //this.addMarker(item);
                //this.position = new google.maps.LatLng(item.Lat, item.Long);
                //this.map.setCenter(this.position);
            }
        });

        if (matched) {
            console.log("Matched");
        }
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

    addCurrentLoc(tLat: number, tLong: number ) {
        var location: Location = {
            BuildingName: 'You are Here',
            Key: 'QWERTY',
            Lat: tLat,
            Long: tLong
        }

        //console.log("Your Location, " + location);

        //FirebaseService.newLocList.push(location);
        //this.newLocList.push(location);
        //console.log(FirebaseService.newLocList.length);
    }
}
