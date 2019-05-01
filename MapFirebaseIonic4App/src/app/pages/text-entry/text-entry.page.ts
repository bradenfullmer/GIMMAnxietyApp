import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from '../../services/firebase.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-text-entry',
  templateUrl: './text-entry.page.html',
  styleUrls: ['./text-entry.page.scss'],
})
export class TextEntryPage implements OnInit {

    constructor(private router: Router, private geolocation: Geolocation, public firebaseService: FirebaseService) { }

    bCode: string;

    ngOnInit() {

    }
    loadMapPage() {
        //this.firebaseService.checkBuilding();
        this.firebaseService.setBuildingCode(this.bCode);
        //this.firebaseService.checkBuilding();
        var tLocLat: number;
        var tLocLong: number;
        this.geolocation.getCurrentPosition().then(pos => {
            tLocLat = pos.coords.latitude;
            tLocLong = pos.coords.longitude;
        }).catch((error) => {
            console.log('Error getting location', error);
            });

        this.firebaseService.addCurrentLoc(tLocLat, tLocLong);
        //if (FirebaseService.getStaticLocation()) {
        //    this.router.navigate(['../home']);
        //} else {
        //    console.log("Location issues... again");
        //}
    }
}
