import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { MapthemeService } from "src/app/services/maptheme.service";
import { LayoutService } from "src/app/services/layout.service";
import { FlightdataService } from "src/app/services/flightdata.service";
import { TtsService } from "src/app/services/tts.service";

@Component({
  selector: "app-adcp",
  templateUrl: "./adcp.component.html",
  styleUrls: ["./adcp.component.css"]
})
export class AdcpComponent implements OnInit {
  latCen: number = 23.5;
  lngCen: number = 91;
  zoom: number = 6.8;
  color = "primary";
  checked = false;
  disabled = false;
  mapThemeDayMode: any[];
  arrElementData: any[];
  arrElementLabel: any[];
  flightData: any[];
  tempFlightData: any[];
  acAOR: any[];
  loggedUserId: number;
  t: any;
  isTtsOn: boolean = false;
  ttsTxt: string;
  acIdForTts: number;
  isSpkrOn: number = 0;
  delay: number = 6000;
  uLat: number;
  uLng: number;
  readiness: string;
  gco: string;
  manningState: string;
  coTime: string;
  x1: number = 0;
  x2: number = 0;
  x3: number = 0;
  x4: number = 0;
  x5: number = 0;
  opList: any[] = [];
  isOPVisible: boolean = false;
  constructor(
    public authService: AuthService,
    private themeService: MapthemeService,
    private layoutService: LayoutService,
    private flightdataService: FlightdataService,
    public ttsService: TtsService
  ) {}
  //
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
      console.log("arrElementLabel AD Units: ", this.arrElementLabel);
      // let data = this.arrElementLabel.filter(m => m.elementId == loggedUID);
      let index = this.arrElementLabel.findIndex(
        p => p.elementId == this.loggedUserId
      );
      let deplId = this.arrElementLabel[index].deploymentId;
      this.createOPArray(deplId);
    });
  }

  createOPArray(deplId) {
    let data = {
      deploymentId: deplId,
      queryId: "13"
    };
    this.layoutService.submitData(data).subscribe(result => {
      if (result) {
        this.opList = result;
        console.log("List OP Array : ", this.opList);
      } else {
        console.log("No data...");
      }
    });
  }
  semulateFlightProfile(
    acId,
    lat,
    lng,
    height,
    speed,
    heading,
    orig,
    totalAirCraft,
    isVisible
  ) {
    let d = this.flightdataService.projFlightPosn(heading, lat, lng);
    // let labelCoord = this.serviceCalculation.projLocLabel(heading);
    let index = this.flightData.findIndex(p => p.acId == acId);
    console.log("index : ", index + " - " + heading);
    if (index == -1) {
      let data = {
        acId,
        tagId: orig == 2 ? "H " + acId : "A " + acId,
        lat: d.lat,
        lng: d.lng,
        height,
        speed,
        dist: 0,
        rotate: this.flightdataService.calculateAngle(
          d.lat,
          d.lng,
          this.uLat,
          this.uLng
        ),
        brg: this.flightdataService.calculateAngle(
          this.uLat,
          this.uLng,
          d.lat,
          d.lng
        ),
        orig,
        heading,
        totalAirCraft,
        isVisible,
        iconSpkr: "fa fa-volume-off"
      };
      if (isVisible == 1) {
        this.flightData.push(data);
        this.flightData.sort((a, b) =>
          a.dist > b.dist
            ? 1
            : a.dist === b.dist
            ? a.acId > b.acId
              ? 1
              : -1
            : -1
        );
      }
    } else {
      if (isVisible == 0) {
        this.flightData.splice(index, 1);
      } else {
        let r = this.flightdataService.calculateAngle(
          this.flightData[index].lat,
          this.flightData[index].lng,
          d.lat,
          d.lng
        );
        this.flightData[index].rotate =
          r == 0 ? this.flightData[index].rotate : r;
        // ======= Distance =================
        this.flightData[index].dist = Math.floor(
          this.flightdataService.calculateDistance(
            this.uLat,
            this.uLng,
            d.lat,
            d.lng
          ) / 1000
        );
        // ======= Bearing =================
        this.flightData[index].brg = this.flightdataService.calculateAngle(
          this.uLat,
          this.uLng,
          d.lat,
          d.lng
        );
        this.flightData[index].lat = d.lat;
        this.flightData[index].lng = d.lng;
        // ======== Text to Speech ===============

        this.ttsTxt =
          acId +
          " at  " +
          this.flightData[index].dist +
          " Kilo and  " +
          this.flightData[index].brg +
          " Degree";

        this.acIdForTts == acId && this.isTtsOn
          ? this.ttsService.speech(this.ttsTxt)
          : null;

        // }
        // this.ttsTxt =
        //   this.x1 == 1
        //     ? " Guns Free Guns Free"
        //     : this.x2 == 1
        //     ? "Hold Fire Hold Fire"
        //     : this.x3 == 1 || this.x5 == 1
        //     ? "Guns Tight Guns Tight"
        //     : this.x4 == 1
        //     ? "Cancel Hold Fire"
        //     : acId +
        //       " at " +
        //       this.flightData[index].dist +
        //       " Kilo  " +
        //       this.flightData[index].brg +
        //       " Degree";

        // this.acIdForTts == acId && this.isTtsOn
        //   ? this.ttsService.speech(this.ttsTxt)
        //   : null;

        // ======== Generate Con Order ===========
        this.generateConOrder(acId, orig, this.flightData[index].dist);
        // ======== Sort on Distance from CP =====
        this.flightData.sort((a, b) =>
          a.dist > b.dist
            ? 1
            : a.dist === b.dist
            ? a.acId > b.acId
              ? 1
              : -1
            : -1
        );
      }
    }
  }

  ttsSvc(acId) {
    this.isSpkrOn == 1 ? (this.isSpkrOn = 0) : (this.isSpkrOn = 1);
    this.ttsService.cancel();
    if (this.isSpkrOn == 1) {
      for (let i = 0; i < this.flightData.length; i++) {
        if (this.flightData[i].acId == acId) {
          this.flightData[i].iconSpkr = "fa fa-volume-up";
          this.acIdForTts = acId;
          this.isTtsOn = true;
        } else {
          this.flightData[i].iconSpkr = "fa fa-volume-off";
        }
      }
    } else {
      this.ttsService.pause();
      this.isTtsOn = false;
      for (let i = 0; i < this.flightData.length; i++) {
        this.flightData[i].iconSpkr = "fa fa-volume-off";
      }
      // let k = this.flightData.findIndex(p => p.acId == acId);
      // this.flightData[k].iconSpkr = "fa fa-volume-off";
    }

    console.log(acId);
  }

  // ============  Control Order ===========================
  generateConOrder(acId, orig, dist) {
    if (dist <= 30) {
      let i = this.acAOR.findIndex(p => p.acId == acId);
      if (i == -1) {
        let info = {
          acId,
          orig
        };
        this.acAOR.push(info);
      }
      let j = this.acAOR.findIndex(p => p.orig == 1);
      if (j == -1) {
        if (this.x1 == 0) {
          this.readiness = "High";
          this.gco = "Guns Free";
          this.manningState = "A";
          let d = new Date();
          this.coTime = d.toLocaleTimeString();
          this.x1 = 1;
          this.x2 = 0;
          this.x3 = 0;
          this.x4 = 0;
          this.x5 = 0;
        }
      } else {
        if (this.x2 == 0) {
          this.readiness = "High";
          this.gco = "Hold Fire";
          this.manningState = "A";
          let d = new Date();
          this.coTime = d.toLocaleTimeString();
          this.x1 = 0;
          this.x2 = 1;
          this.x3 = 0;
          this.x4 = 0;
          this.x5 = 0;
        }
      }
    } else {
      if (this.acAOR.length == 0) {
        if (this.x3 == 0) {
          this.readiness = "High";
          this.gco = "Guns Tight";
          this.manningState = "A";
          let d = new Date();
          this.coTime = d.toLocaleTimeString();
          this.x1 = 0;
          this.x2 = 0;
          this.x3 = 1;
          this.x4 = 0;
          this.x5 = 0;
        }
      } else {
        let k = this.acAOR.findIndex(p => p.acId == acId);
        if (k != -1) {
          if (orig == 1) {
            if (this.x4 == 0) {
              this.readiness = "High";
              this.gco = "Cancel Hold Fire";
              this.manningState = "A";
              let d = new Date();
              this.coTime = d.toLocaleTimeString();
              this.acAOR.splice(k, 1);
              this.x1 = 0;
              this.x2 = 0;
              this.x3 = 0;
              this.x4 = 1;
              this.x5 = 0;
            }
          } else {
            if (this.x5 == 0) {
              this.readiness = "High";
              this.gco = "Guns Tight";
              this.manningState = "A";
              let d = new Date();
              this.coTime = d.toLocaleTimeString();
              this.acAOR.splice(k, 1);
              this.x1 = 0;
              this.x2 = 0;
              this.x3 = 0;
              this.x4 = 0;
              this.x5 = 1;
            }
          }
        }
      }
    }
  }

  // =======================================================

  getFlightData() {
    this.flightdataService.getFlightData().subscribe(resp => {
      this.tempFlightData = [];
      // console.log("Temp Flight Data Array 1009:", this.tempFlightData);
      if (resp) {
        this.tempFlightData = resp;
        for (let i = 0; i < this.tempFlightData.length; i++) {
          if (this.tempFlightData[i].Ser > 0) {
            let acId = this.tempFlightData[i].acId;
            let lat = parseFloat(this.tempFlightData[i].lat);
            let lng = parseFloat(this.tempFlightData[i].lng);
            let height = parseFloat(this.tempFlightData[i].height);
            let speed = parseFloat(this.tempFlightData[i].speed);
            let heading = parseFloat(this.tempFlightData[i].heading);
            let orig = this.tempFlightData[i].origin;
            let isVisible = this.tempFlightData[i].isVisible;
            let totalAirCraft = parseFloat(this.tempFlightData[i].numberAc);
            this.semulateFlightProfile(
              acId,
              lat,
              lng,
              height,
              speed,
              heading,
              orig,
              totalAirCraft,
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

  getLoggedUnitPosn(uid) {
    let data = {
      unitId: uid,
      queryId: 16
    };
    this.layoutService.getLoggedUnitPosn(data).subscribe(result => {
      this.uLat = result[0].lat;
      this.uLng = result[0].lng;

      console.log("Result Posn 1122 : ", result[0].lat + " - " + result[0].lng);
    });
  }

  reset_flightdata() {
    this.flightData = [];
  }
  zoomChange($event) {
    this.isOPVisible = $event > 8 ? true : false;
    console.log("OP Visible : ", this.isOPVisible);
  }

  // getOPData(deploymentId) {}s
  ngOnInit() {
    this.flightData = [];
    this.arrElementData = [];
    this.arrElementLabel = [];
    this.acAOR = [];
    this.loggedUserId = this.authService.LoggedUserData(5);
    this.getLoggedUnitPosn(this.loggedUserId);
    this.printLocation();

    this.mapThemeDayMode = this.themeService.mapMode();
    this.start();
  }
}
