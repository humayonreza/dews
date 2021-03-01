import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { MapthemeService } from "src/app/services/maptheme.service";
import { LayoutService } from "src/app/services/layout.service";
import { FlightdataService } from "src/app/services/flightdata.service";

export interface arrConOrder {
  value: number;
  viewValue: string;
}
@Component({
  selector: "app-adoc",
  templateUrl: "./adoc.component.html",
  styleUrls: ["./adoc.component.css"]
})
export class AdocComponent implements OnInit {
  mapThemeDayMode: any[] = [];
  arrElementData: any[] = [];
  arrElementLabel: any[] = [];
  flightData: any[] = [];
  tempFlightData: any[];
  arrAdunits: any[] = [];
  arrConOrder: any[] = [];
  kpi_withInThreatList: any[] = [];
  acAOR: any[] = [];
  //
  showFiller = true;
  latCen: number = 23.5;
  lngCen: number = 91;
  zoom: number = 6.8;
  color = "primary";
  checked = false;
  disabled = false;

  toggleId: number = 0;
  menuState: number = 0;

  t: any;
  delay: number = 3000;
  readiness: string;
  gco: string;
  manningState: string;
  coTime: string;
  x1: number = 0;
  x2: number = 0;
  x3: number = 0;
  x4: number = 0;
  x5: number = 0;
  constructor(
    public authService: AuthService,
    private themeService: MapthemeService,
    private layoutService: LayoutService,
    private flightdataService: FlightdataService
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
      this.arrAdunits = this.layoutService.returnArrAdunits();
      console.log("arrElementData : ", this.arrElementData);
      this.initConOrder(); // Initial Control Order as per AD Unit
    });
  }
  //
  initConOrder() {
    // let newTime = new Date();
    // let coTime = newTime.toLocaleTimeString();
    this.arrAdunits.sort((a, b) => (a.elementId > b.elementId ? 1 : -1));
    let c = 1;
    for (let i = 0; i < this.arrAdunits.length; i++) {
      let data = {
        Ser: c,
        uId: this.arrAdunits[i].elementId,
        uName: this.arrAdunits[i].elementName,
        readiness: "High",
        coId: 1
      };
      c = c + 1;
      this.arrConOrder.push(data);
      this.arrConOrder.sort((a, b) => (a.uId > b.uId ? 1 : -1));
    }
  }

  semulateFlightProfile(acId, lat, lng, heading, orig, isVisible) {
    let d = this.flightdataService.projFlightPosn(heading, lat, lng);
    let index = this.flightData.findIndex(p => p.acId == acId);
    if (index == -1) {
      let data = {
        acId,
        orig,
        lat: d.lat,
        lng: d.lng,
        rotate: 0,
        isVisible
      };
      if (isVisible == 1) {
        this.flightData.push(data);
      }
    } else {
      if (isVisible == 0) {
        this.flightData.splice(index, 1);
      } else {
        this.flightData[index].rotate = heading;
        this.flightData[index].lat = d.lat;
        this.flightData[index].lng = d.lng;
      }
      this.generateConOrder(
        acId,
        orig,
        this.flightData[index].lat,
        this.flightData[index].lng
      );
    }
  }

  generateConOrder(acId, orig, aclat, aclng) {
    for (let i = 0; i < this.arrAdunits.length; i++) {
      let dist = Math.floor(
        this.flightdataService.calculateDistance(
          aclat,
          aclng,
          this.arrAdunits[i].lat,
          this.arrAdunits[i].lng
        ) / 1000
      );
      this.processConOrder(acId, orig, dist, this.arrAdunits[i].elementId);
    }
  }

  processConOrder(acId, orig, dist, uId) {
    if (dist <= 30) {
      let index = this.arrConOrder.findIndex(p => p.uId == uId);
      let i = this.acAOR.findIndex(p => p.acId == acId);
      if (i == -1) {
        let info = {
          acId,
          orig
        };
        this.acAOR.push(info);
        if (orig == 1) {
          this.arrConOrder[index].coId = 3;
        } else {
          this.arrConOrder[index].coId = 2;
          // alert(acId);
        }
      } else {
        if (orig == 1) {
          this.arrConOrder[index].coId = 3;
        } else {
          if (this.arrConOrder[index].coId == 3) {
            this.arrConOrder[index].coId = 3;
          } else {
            this.arrConOrder[index].coId = 2;
            // alert(acId);
          }
        }
      }
    } else if (dist > 30 && dist < 40) {
      let index = this.arrConOrder.findIndex(p => p.uId == uId);
      let x = this.acAOR.findIndex(p => p.acId == acId);
      if (x == -1) {
        this.arrConOrder[index].coId = 1;
        // if (this.arrConOrder[index].coId == 2) {
        //   this.arrConOrder[index].coId = 2;
        // } else {
        //   this.arrConOrder[index].coId = 1;
        // }
      } else {
        let k = this.acAOR.findIndex(p => p.acId == acId);
        if (k != -1) {
          if (orig == 1) {
            if (this.arrConOrder[index].coId == 3) {
              this.arrConOrder[index].coId = 4;
            } else if (this.arrConOrder[index].coId == 4) {
              this.arrConOrder[index].coId = 1;
              this.acAOR.splice(k, 1);
            }
          } else {
            if (this.arrConOrder[index].coId == 2) {
              this.arrConOrder[index].coId = 2;
              this.acAOR.splice(k, 1);
            }
          }
        }
      }
    }
  }

  // SelectListDesc(unitId) {
  //   console.log("Array :", TypeId);
  //   this.ArrDescFiltered = this.arrConOrder.filter(m => m.type == TypeId);
  //   console.log("Array :", this.ArrDescFiltered);
  // }
  // processConOrder(acId, orig, dist)

  getFlightData() {
    this.flightdataService.getFlightData().subscribe(resp => {
      if (resp) {
        this.tempFlightData = [];
        this.tempFlightData = resp;
        console.log("Temp Flight Data Array 1009:", this.tempFlightData);
        for (let i = 0; i < this.tempFlightData.length; i++) {
          if (this.tempFlightData[i].Ser > 0) {
            let acId = this.tempFlightData[i].acId;
            let lat = parseFloat(this.tempFlightData[i].lat);
            let lng = parseFloat(this.tempFlightData[i].lng);
            let heading = parseFloat(this.tempFlightData[i].heading);
            let orig = this.tempFlightData[i].origin;
            let isVisible = this.tempFlightData[i].isVisible;
            this.semulateFlightProfile(
              acId,
              lat,
              lng,
              heading,
              orig,
              isVisible
            );
          }
        }
      } else {
        console.log("No flight data...");
      }
    });
  }

  start() {
    this.t = setTimeout(() => {
      this.getFlightData();
      this.start();
    }, this.delay);
  }

  resetFlightData(data) {
    data == 5232 ? (this.flightData = []) : null;
  }

  reset_flightdata() {
    this.flightData = [];
  }

  ngOnInit() {
    this.printLocation();
    this.mapThemeDayMode = this.themeService.mapMode();
    this.start();
  }
}
