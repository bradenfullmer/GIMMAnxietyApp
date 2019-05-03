import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FirebaseService } from '../services/firebase.service';
import { Location } from '../models/location.model';
import 'rxjs-compat/add/operator/map';
import { Observable } from 'rxjs-compat/Observable';
import { Router } from '@angular/router';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  public base64Image: string;
  locationsList: Array<string> = new Array<string>();
  location: string;
  map: any;
  position: any;
  locationKey: any;
  public Buildings: string;
  start: any;
  end: any;
  directionsService: any;
  directionsDisplay: any;

  constructor(private router: Router, private geolocation: Geolocation, public firebaseService: FirebaseService) { }

  ngOnInit() {
    let mapOptions = {
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullScreenControl: false
    }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.directionsService = new google.maps.DirectionsService;
      this.directionsDisplay = new google.maps.DirectionsRenderer;


    this.geolocation.getCurrentPosition().then(pos => {
        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.start = latLng;
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng,
        icon: {
          url: 'http://maps.google.com/mapfiles/kml/shapes/firedept.png'
      }
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.firebaseService.checkBuilding();
    console.log(FirebaseService.getPosList());

    for (let item of FirebaseService.getPosList()) {
      console.log(item.BuildingName);
      this.addMarker(item);
      this.locationsList.push(item.BuildingName);
      this.position = new google.maps.LatLng(item.Lat, item.Long);
      this.map.setCenter(this.position);
      //console.log("here");
      }
      this.calculateAndDisplayRoute();

      FirebaseService.resetList();
    }

    calculateAndDisplayRoute() {
        this.directionsService.route({
            origin: this.start,
            destination: this.end,
            travelMode: 'WALKING'
        }, (response, status) => {
            if (status === 'OK') {
                this.directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
  //onContextChange(ctxt: string): void {
  //this.locationsList$ = this.firebaseService.getLocationsList().snapshotChanges().map(changes => {
  //  return changes.map( c=> ({
  //    key: c.payload.key, ...c.payload.val()
  //  }));
  //});
  //}
  addMarker(location: any) {
    let latLng = new google.maps.LatLng(location.Lat, location.Long);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

      this.end = latLng;

    this.addInfoWindow(marker, location);
  }
  assignLocation(loc: Location) {
    this.firebaseService.setCurrentLocation(loc);
    this.locationKey = loc.Key;
    console.log("Assigned location key: " + this.locationKey);
  }
  addInfoWindow(marker, location) {
    let contentString =
      '<div class="info-window" id="clickableItem" >' +
        '<h3>' + '</h3>' +
        '<div class="info-content">' +
          '<p>' + location.BuildingName + '</p>' +
        '</div>' +
      '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 400
    });

    google.maps.event.addListener(infoWindow, 'domready', () => {
      var clickableItem = document.getElementById('clickableItem');
      clickableItem.addEventListener('click', () => {
        //console.log("clicked on marker");
        this.firebaseService.setCurrentLocation(location);
        this.Buildings = location.BuildingName;
        this.router.navigate(['/list', this.Buildings]);
      });
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
    google.maps.event.addListener(this.map, 'click', () => {
      infoWindow.close(this.map, marker);
    });
  }
}
