import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { MapthemeService } from "src/app/services/maptheme.service";
import { LayoutService } from "src/app/services/layout.service";
import { BackendService } from "src/app/services/backend.service";

@Component({
  selector: "app-deplenairbase",
  templateUrl: "./deplenairbase.component.html",
  styleUrls: ["./deplenairbase.component.css"]
})
export class DeplenairbaseComponent implements OnInit {
  isLinear: boolean;
  latCen: number = 23.5;
  lngCen: number = 91;
  zoom: number = 6.7;
  color = "primary";
  checked = false;
  disabled = false;

  baseLat: number;
  baseLng: number;
  baseId: number;
  exName: string;
  mapMode: any[];
  arrElementData: any[];
  arrElementLabel: any[];

  baseList: any[];
  kpiList: any[];
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
      console.log("arrElementLabel : ", this.arrElementData);
    });
  }
  getBaseList(orig) {
    this.origId = orig;
    this.baseList = [];
    this.baseList = this.arrElementLabel.filter(m => m.origin == orig);
    console.log("Array BaseList :", this.baseList);
  }

  // s

  deplAirBase(inputValue) {
    let data = {
      ElementId: inputValue.baseId,
      ExName: inputValue.exName ? inputValue.exName : "NA",
      baseLat: inputValue.baseLat,
      baseLng: inputValue.baseLng,
      queryId: "12"
    };

    this.backendService.submitData(data).subscribe(result => {
      if (result) {
        this.backend_resp = "Air Base Redeployed successfully...";
        this.printLocation();
      } else {
        console.log("No data...");
      }
    });
  }

  getLocation($event) {
    this.baseLat = $event.coords.lat;
    this.baseLng = $event.coords.lng;
  }

  reset(val) {
    console.log(val);
  }
  ngOnInit() {
    this.kpiList = [];
    this.mapMode = this.themeService.mapMode();
    this.printLocation();
  }
}
