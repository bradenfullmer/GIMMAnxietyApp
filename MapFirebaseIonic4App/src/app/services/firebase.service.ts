import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { Location } from '../models/location.model';
import 'firebase/storage';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
    private locationListRef = this.db.list<Location>('Buildings');
    public currentLocation: Location;
    public buildingLocation: Location;

    public buildingCode: string;

    setBuildingCode(bCode: string) {
        bCode = bCode.replace(/[0-9]/g, '');
        console.log(bCode);
        this.buildingCode = bCode;
    }
    getBuildingCode() {
        return this.buildingCode;
    }

    checkBuilding() {

        this.locationListRef.forEach(function (value, bCode:string = this.getBuildingCode()) {
            if (bCode == value.key) {
                console.log("The Key has matched");
                this.setBuildingLocation(value);
            }
        });
    }
    setBuildingLocation(loc: Location) {
        this.buildingLocation = loc;
    }
    getBuildingLocation() {
        return this.buildingLocation;
    }

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }
  setCurrentLocation(location: Location){
    this.currentLocation = location;
  }
  getCurrentLocation(){
    return this.currentLocation;
  }
  getLocationsList(){
    return this.buildingLocation;
  }
  //addLocation(location: Location){
  //  return this.locationListRef.push(location);
  //}
  //editLocation(location: Location){
  //  return this.locationListRef.update(location.key, location);
  //}
  //deleteLocation(location: Location){
  //  return this.locationListRef.remove(location.key);
  //}
}
