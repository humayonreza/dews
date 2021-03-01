import { Component, OnInit } from "@angular/core";
import { FlightdataService } from "src/app/services/flightdata.service";
import { LayoutService } from "src/app/services/layout.service";

@Component({
  selector: "app-wolf2",
  templateUrl: "./wolf2.component.html",
  styleUrls: ["./wolf2.component.css"]
})
export class Wolf2Component implements OnInit {
  attkList: any[];
  attkProfileDetail: any[];
  flightData: any[];
  calSpeed: any[];

  x1: number; // En Air Base Lat
  y1: number; // En Air Base Lng
  x2: number;
  y2: number;
  delay: number = 1190;
  deltaLat: number;
  deltaLng: number;
  speed: number;
  height: number;
  t: any;
  counter: number = 0;
  i: number = 1;
  k: number = 0;
  flightId: number;
  headAngle: number = 40;
  mach: number = 330; // Speed of Aircraft
  isVisible: number = 1;
  isReset: number = 1;
  baseId: number = 812;
  distX: number;

  constructor(
    private flightdataService: FlightdataService,
    private layoutService: LayoutService
  ) {}

  uploadFlightData() {
    // console.log("I am here");
    // this.flightData = [];
    let d = Math.floor(
      this.flightdataService.calculateDistance(
        this.x1,
        this.y1,
        this.x2,
        this.y2
      )
    );

    let x = {
      dist: d
    };
    this.calSpeed.push(x);
    // console.log("Distance Remaining : ", x);
    if (this.k > 0) {
      this.distX = this.calSpeed[this.k - 1].dist - this.calSpeed[this.k].dist;
      // console.log("Distance Crossed : ", this.distX + " Spd : ", this.speed);
    }
    this.k = this.k + 1;
    let shift = this.mach * this.speed;
    let thrust = shift * (this.delay / 1000);
    let numDeltas = Math.round(d / thrust);
    this.deltaLat = (this.x1 - this.x2) / numDeltas;
    this.deltaLng = (this.y1 - this.y2) / numDeltas;
    this.x1 -= this.deltaLat;
    this.y1 -= this.deltaLng;
    // Ser	date	acId	speed	height	origin	heading lat	lng
    let data = {
      acId: this.flightId,
      speed: this.speed,
      height: this.height,
      origin: 2,
      heading: this.headAngle,
      lat: this.x1,
      lng: this.y1,
      isVisible: this.isVisible,
      queryId: 6
    };
    // console.log("Distance: shift ", d + " - " + shift);
    if (d < this.distX + 10) {
      this.i = this.i + 1;
      if (this.attkProfileDetail.length <= this.i) {
        this.terminationFlightProfile();
      } else {
        this.x2 = this.attkProfileDetail[this.i].lat;
        this.y2 = this.attkProfileDetail[this.i].lng;
        this.speed = this.attkProfileDetail[this.i].Speed;
        this.height = this.attkProfileDetail[this.i].Ht;
        this.headAngle = this.flightdataService.calculateAngle(
          this.x1,
          this.y1,
          this.x2,
          this.y2
        );
        // console.log("Heading ", this.headAngle);
      }
    } else {
      // this.flightdataService
      //   .processFlightData(data)
      //   .subscribe(result => console.log("Ser inserted :", result));
      this.flightdataService.processFlightData(data);
    }
  }
  //
  terminationFlightProfile() {
    let data = {
      acId: this.flightId,
      speed: 0,
      height: 0,
      origin: 0,
      heading: 0,
      lat: 0,
      lng: 0,
      isVisible: 0,
      queryId: 6
    };
    // this.flightdataService.processFlightData(data).subscribe(result => result);
    this.flightdataService.processFlightData(data);
  }
  isVisibleAircraft(isvisVal) {
    this.isVisible = isvisVal;
  }
  //
  start() {
    this.t = setTimeout(() => {
      this.uploadFlightData();
      this.start();
    }, this.delay);
  }
  //
  stopTimer() {
    clearTimeout(this.t);
    this.terminationFlightProfile();
  }
  //
  init2Restart() {
    this.i = 1;
    this.isVisible = 1;
    let loc = this.layoutService.getBaseLatLng(this.baseId);
    this.x1 = loc.lat; // lat = Base Lat
    this.y1 = loc.lng; // lng = Base Lng
    let data = {
      queryId: 7
    };
    this.flightdataService.getDaywiseMaxFlighId(data).subscribe(resp => {
      this.flightId = resp;
    });
  }
  //
  launchAttk(attkId) {
    this.init2Restart();
    let data = {
      attkId,
      queryId: 8
    };
    this.flightdataService.getAttkProfileDetails(data).subscribe(result => {
      this.attkProfileDetail = result;
      this.x2 = this.attkProfileDetail[this.i].lat;
      this.y2 = this.attkProfileDetail[this.i].lng;
      this.speed = this.attkProfileDetail[this.i].Speed;
      this.height = this.attkProfileDetail[this.i].Ht;
      this.headAngle = this.flightdataService.calculateAngle(
        this.x1,
        this.y1,
        this.x2,
        this.y2
      );
    });
    this.start();
  }
  //
  remove(attkId) {
    let data = {
      attkId,
      queryId: 11
    };
    this.flightdataService.removeAttkDATA(data).subscribe(result => {
      console.log(result);
      if (result) {
        this.getAttkProfileList();
      }
    });
  }
  getAttkProfileList() {
    let data = {
      baseId: this.baseId,
      queryId: 9
    };
    this.flightdataService.getAttkProfileIndexList(data).subscribe(result => {
      this.attkList = result;
    });
  }
  //
  ngOnInit() {
    this.calSpeed = [];
    this.attkList = [];
    this.attkProfileDetail = [];
    this.getAttkProfileList();
  }
}
