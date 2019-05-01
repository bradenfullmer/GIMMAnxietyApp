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
        this.firebaseService.getLocationsList().valueChanges().subscribe(res => {
            for (let item of res) {
                if (item.Key == this.firebaseService.getBuildingCode()) {
                    console.log("Value matched: " + this.firebaseService.getBuildingCode());
                    this.firebaseService.setBuildingLocation(item);
                    console.log(this.firebaseService.getBuildingLocation());
                }
                else {
                    //console.log("NOT A MATCH: " + item.Key);
                }
                //this.addMarker(item);
                //this.position = new google.maps.LatLng(item.Lat, item.Long);
                //this.map.setCenter(this.position);
            }
        });
        //this.firebaseService.checkBuilding();

        (async () => {
            // Do something before delay
            console.log('before delay');
            await this.delay(10000);

            // Do something after
            console.log('after delay');

            if (FirebaseService.getStaticLocation()) {
                this.router.navigate(['../home']);
            } else {
                console.log("Location issues... again");
            }

        })();
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
