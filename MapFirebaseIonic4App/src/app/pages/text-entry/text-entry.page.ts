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


        (async () => {
            // Do something before delay
            console.log('before delay');

            this.firebaseService.setBuildingCode(this.bCode);
            this.firebaseService.checkBuilding();

            await this.delay(1000);

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
