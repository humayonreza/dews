import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { MapthemeService } from "src/app/services/maptheme.service";
import { LayoutService } from "src/app/services/layout.service";
import { FlightdataService } from "src/app/services/flightdata.service";

@Component({
  selector: "app-encon",
  templateUrl: "./encon.component.html",
  styleUrls: ["./encon.component.css"]
})
export class EnconComponent implements OnInit {
  icon = {
    url: "http://localhost:8080/backendDEWS/images/gif/013.gif",
    scaledSize: {
      width: 10,
      height: 10
    }
  };

  latCen: number = 23.5;
  lngCen: number = 91;
  zoom: number = 6.7;
  color = "primary";
  checked = false;
  disabled = false;

  mapThemeDayMode: any[];
  arrElementData: any[];
  arrElementLabel: any[];
  tempFlightData: any[];
  baseFD: any[] = [];
  flightData: any[];
  delay: number = 1700;
  t: any;
  constructor(
    public authService: AuthService,
    private themeService: MapthemeService,
    private layoutService: LayoutService,
    private flightdataService: FlightdataService
  ) {}
  // toggleIcon() {
  //   console.log("T : ", this.toggleId);
  //   this.toggleId == 0 ? (this.toggleId = 1) : (this.toggleId = 0);
  //   this.menuState == 0 ? (this.menuState = 1) : (this.menuState = 0);
  // }
  printLocation() {
    let category = this.authService.LoggedUserData(2);
    let loggedUnit =
      this.authService.LoggedUserData(3) == 0
        ? this.authService.LoggedUserData(4)
        : this.authService.LoggedUserData(5);

    let data = { queryId: 15 };
    this.layoutService.getDeplElmData(data).subscribe(result => {
      result ? this.layoutService.layout(loggedUnit, category) : null;
      this.arrElementData = this.layoutService.printDeplElementLoc();
      this.arrElementLabel = this.layoutService.printDeplElmLabel();
      // console.log("arrElementLabel : ", this.arrElementLabel);
    });
  }

  semulateFlightProfile(Ser, acId, lat, lng, heading, orig, isVisible) {
    let d = this.flightdataService.projFlightPosn(heading, lat, lng);
    let index = this.flightData.findIndex(p => p.acId == acId);
    if (index == -1) {
      let data = {
        Ser,
        acId,
        tagId: orig == 2 ? "A " + acId : "H " + acId,
        lat: d.lat,
        lng: d.lng,
        orig,
        rotate: 90,
        isVisible
      };
      if (isVisible == 1) {
        this.flightData.push(data);
      }
    } else {
      if (isVisible == 0) {
        this.flightData.splice(index, 1);
      } else {
        this.flightData[index].Ser = Ser;
        let r = this.flightdataService.calculateAngle(
          this.flightData[index].lat,
          this.flightData[index].lng,
          d.lat,
          d.lng
        );
        this.flightData[index].rotate =
          r == 0 ? this.flightData[index].rotate : r;

        // this.flightData[index].rotate = heading;

        this.flightData[index].lat = d.lat;
        this.flightData[index].lng = d.lng;
      }
    }
    console.log("Flight Data Array 1010:", this.flightData);
  }

  getFlightData() {
    this.flightdataService.getFlightData().subscribe(resp => {
      if (resp) {
        this.tempFlightData = resp;
        // console.log("Temp Flight Data :", this.tempFlightData);
        for (let i = 0; i < this.tempFlightData.length; i++) {
          // if (this.tempFlightData[i].Ser > 0) {
          let Ser = this.tempFlightData[i].Ser;
          let acId = this.tempFlightData[i].acId;
          let lat = parseFloat(this.tempFlightData[i].lat);
          let lng = parseFloat(this.tempFlightData[i].lng);
          let heading = this.tempFlightData[i].heading;
          let orig = this.tempFlightData[i].origin;
          let isVisible = this.tempFlightData[i].isVisible;
          this.semulateFlightProfile(
            Ser,
            acId,
            lat,
            lng,
            heading,
            orig,
            isVisible
          );
        }
      } else {
        console.log("No flight data...");
      }
    });
  }

  start() {
    this.t = setTimeout(() => {
      this.tempFlightData = [];
      this.baseFD = this.flightdataService.getFlightDataFromBase();
      for (let i = 0; i < this.baseFD.length; i++) {
        let data = this.baseFD[i];
        this.flightdataService
          .submitFlightData(data)
          .subscribe(result => console.log("Ser inserted :", result));
      }
      console.log("BASE DATA :", this.baseFD);
      this.getFlightData();
      this.start();
    }, this.delay);
  }

  resetFlightData() {
    let data = {
      resetId: 5232,
      queryId: 10
    };
    this.flightdataService.resetFlightData(data).subscribe(result => {
      // console.log("Reset Me : ", result);
      this.flightData = [];
    });
  }

  ngOnInit() {
    this.arrElementLabel = [];
    this.arrElementData = [];
    this.flightData = [];
    this.mapThemeDayMode = this.themeService.mapMode();
    this.printLocation();
    this.start();
    // let d = new Date();
    // let n = d.toLocaleTimeString();
    // console.log("Time : ", n);
  }
}
