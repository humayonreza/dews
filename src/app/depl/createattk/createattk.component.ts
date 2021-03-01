import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { MapthemeService } from "src/app/services/maptheme.service";
import { LayoutService } from "src/app/services/layout.service";
import { BackendService } from "src/app/services/backend.service";

export interface acSpeed {
  value: string;
  viewValue: string;
}
export interface acHeight {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-createattk",
  templateUrl: "./createattk.component.html",
  styleUrls: ["./createattk.component.css"]
})
export class CreateattkComponent implements OnInit {
  isLinear: boolean;
  latCen: number = 23.5;
  lngCen: number = 91;
  zoom: number = 6.7;
  color = "primary";
  checked = false;
  disabled = false;
  speed: number;
  height: number;
  pLat: number;
  pLng: number;
  baseId: number;
  tgtId: number;
  mapThemeDayMode: any[];
  arrElementData: any[];
  arrElementLabel: any[];
  pathCoords: any[];
  baseList: any[];
  kpiList: any[];
  origId: number;
  attkId: number;
  backend_resp_initiate_sortie: string = "Waiting for Backend Response....";
  backend_resp_sortie_details: string = "Waiting for Backend Response....";
  constructor(
    public authService: AuthService,
    public authorizationService: AuthService,
    private layoutService: LayoutService,
    private themeService: MapthemeService,
    private backendService: BackendService
  ) {}
  // =============
  arrSpeed: acSpeed[] = [
    { value: "0.5", viewValue: "0.5 Mach" },
    { value: "1.0", viewValue: "1.0 Mach" },
    { value: "1.5", viewValue: "1.5 Mach" },
    { value: "2.0", viewValue: "2.0 Mach" },
    { value: "2.5", viewValue: "2.5 Mach" },
    { value: "3.0", viewValue: "3.0 Mach" }
  ];
  arrHeight: acHeight[] = [
    { value: "1.0", viewValue: "1000" },
    { value: "1.5", viewValue: "1500" },
    { value: "2.0", viewValue: "2000" },
    { value: "2.5", viewValue: "2500" },
    { value: "3.0", viewValue: "3000" },
    { value: "4.0", viewValue: "4000" },
    { value: "5.0", viewValue: "5000" },
    { value: "6.0", viewValue: "6000" },
    { value: "8.0", viewValue: "8000" }
  ];

  // ===============
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
      this.kpiList = this.arrElementLabel.filter(m => m.origin == 1);
      console.log("arrElementLabel : ", this.arrElementLabel);
    });
  }
  getBaseList(orig) {
    this.origId = orig;
    this.baseList = [];
    this.baseList = this.arrElementLabel.filter(m => m.origin == orig);
    console.log("Array BaseList :", this.baseList);
  }

  initiateSortie(inputValue) {
    // Ser DeploymentId DeploymentDate ElementId lat lng isActive
    let data = {
      baseId: inputValue.baseId,
      tgtId: inputValue.tgtId,
      orig: this.origId,
      queryId: "4"
    };
    console.log("Deploy Data", data);
    this.backendService.submitData(data).subscribe(result => {
      if (result) {
        this.attkId = result;
        this.backend_resp_initiate_sortie = "Profile Created successfully...";
      } else {
        console.log("No data...");
      }
    });
  }

  submitSortieDetails(inputValue) {
    // Ser DeploymentId DeploymentDate ElementId lat lng isActive
    let data = {
      attkId: this.attkId,
      speed: inputValue.speed,
      height: inputValue.height,
      pLat: inputValue.pLat,
      pLng: inputValue.pLng,
      queryId: "5"
    };
    console.log("Deploy Data", data);
    this.backendService.submitData(data).subscribe(result => {
      if (result) {
        this.attkId = result;
        this.backend_resp_sortie_details =
          "Path Profile Info Added for Serial " + this.attkId;
        console.log("attkId : ", this.attkId);
      } else {
        console.log("No data...");
      }
    });
  }

  getLocation($event) {
    this.pLat = $event.coords.lat;
    this.pLng = $event.coords.lng;
    let data = {
      flightId: this.attkId,
      lineCoordLat: $event.coords.lat,
      lineCoordLng: $event.coords.lng
    };
    this.pathCoords.push(data);
    console.log("Path Coord : ", this.pathCoords);
  }

  reset(val) {
    if (val == 2) {
      this.pathCoords = [];
    }
  }
  ngOnInit() {
    this.kpiList = [];
    this.pathCoords = [];
    this.mapThemeDayMode = this.themeService.mapMode();
    this.printLocation();
  }
}
