import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { MapthemeService } from "src/app/services/maptheme.service";
import { LayoutService } from "src/app/services/layout.service";
import { BackendService } from "src/app/services/backend.service";

@Component({
  selector: "app-deplradar",
  templateUrl: "./deplradar.component.html",
  styleUrls: ["./deplradar.component.css"]
})
export class DeplradarComponent implements OnInit {
  isLinear: boolean;
  latCen: number = 23.5;
  lngCen: number = 91;
  zoom: number = 6.7;
  color = "primary";
  checked = false;
  disabled = false;
  ExName: string;
  ElementName: string;
  info: string;
  rLat: number;
  rLng: number;
  OpRange: number;
  baseId: number;
  exName: string;
  mapMode: any[];
  arrElementData: any[];
  arrElementLabel: any[];
  arrRadar: any[] = [];
  indicateLoc: any[] = [];
  origId: number;
  attkId: number;
  backend_resp: string = "Waiting for Backend Response....";

  constructor(
    public authService: AuthService,
    public authorizationService: AuthService,
    private layoutService: LayoutService,
    private themeService: MapthemeService,
    private backendService: BackendService
  ) {}

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
      // this.kpiList = this.arrElementLabel.filter(m => m.origin == 1);
      // console.log("arrElementLabel : ", this.arrElementLabel);
    });
  }

  deplRadar(value) {
    let data = {
      ElmId: value.baseId,
      ExName: value.ExName,
      OpRange: value.OpRange,
      info: value.info,
      rLat: value.rLat,
      rLng: value.rLng,
      queryId: "18"
    };
    this.backendService.submitData(data).subscribe(result => {
      if (result) {
        this.backend_resp =
          result + " Redeployed successfully as Radar Station";
        this.printLocation();
      } else {
        console.log("No data...");
      }
    });
  }

  // reset() {
  //   // this.indicateLoc.pop();
  // }

  getLocation($event) {
    this.rLat = $event.coords.lat;
    this.rLng = $event.coords.lng;
    this.indicateLoc = [];
    this.indicateLoc.push(
      {
        lat: this.rLat,
        lng: this.rLng,
        color: "rgb(66, 134, 244)",
        rad: 2000
      },
      {
        lat: this.rLat,
        lng: this.rLng,
        color: "#f00",
        rad: 4500
      },
      {
        lat: this.rLat,
        lng: this.rLng,
        color: "rgb(66, 134, 244)",
        rad: 25000
      }
    );
  }

  reset(val) {
    val == 0 ? (this.indicateLoc = []) : null;
    console.log(val);
  }

  createRadar(value) {
    console.log("Radar Name : ", value);
    let data = {
      radarName: value.ElementName,
      queryId: "17"
    };
    this.backendService.submitData(data).subscribe(result => {
      if (result) {
        this.backend_resp = result + "  Created successfully as Radar Station.";
        this.getRadarData();
      } else {
        console.log("No data...");
      }
    });
  }
  getRadarData() {
    let data = {
      queryId: "19"
    };
    this.layoutService.getRadarDeplData(data).subscribe(result => {
      if (result) {
        this.arrRadar = result;
        console.log("arrRadar : ", this.arrRadar);
      } else {
        console.log("No data...");
      }
    });
  }

  ngOnInit() {
    this.getRadarData();
    this.mapMode = this.themeService.mapMode();
    this.printLocation();
  }
}
