import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { MapthemeService } from "src/app/services/maptheme.service";
import { BackendService } from "src/app/services/backend.service";
export interface comdStatus {
  ser: number;
  category: number;
  subunitName: string;
  indepStateId: string;
  integralStateId: string;
}

export interface sectorName {
  value: string;
  viewValue: string;
}
@Component({
  selector: "app-deplcp",
  templateUrl: "./deplcp.component.html",
  styleUrls: ["./deplcp.component.css"]
})
export class DeplcpComponent implements OnInit {
  isLinear: boolean = false;
  latCen: number = 23.5;
  lngCen: number = 91;
  zoom: number = 6.7;
  uLat: number;
  uLng: number;
  opLat: number;
  opLng: number;
  opRtArc: number;
  opLtArc: number;
  mapViewMode: any[];
  deployedElement: any[];
  opList: any[];
  arrCS: any[];
  baseId: number;
  exName: string;
  deploymentId: number;
  subunitId1: number;
  subunitId2: number;
  subunitId3: number;
  scs1: number;
  scs2: number;
  scs3: number;
  sectorName: string;
  deplOpt: number = 1;
  isOPVisible: boolean = false;
  opIsChecked: boolean = false;
  backendResp_unitDepl: string = "Waiting for backend response....";
  backendResp_cmdstatus: string = "Waiting for backend response....";
  backendResp_opDepl: string = "Waiting for backend response....";
  constructor(
    public authService: AuthService,
    private themeService: MapthemeService,
    private backendService: BackendService
  ) {}

  arrCSReg: comdStatus[] = [
    {
      ser: 1,
      category: 0,
      subunitName: "P-Bty",
      indepStateId: "01",
      integralStateId: "11"
    },
    {
      ser: 2,
      category: 0,
      subunitName: "Q-Bty",
      indepStateId: "02",
      integralStateId: "12"
    },
    {
      ser: 3,
      category: 0,
      subunitName: "R-Bty",
      indepStateId: "03",
      integralStateId: "13"
    }
  ];

  arrCSMsl: comdStatus[] = [
    {
      ser: 1,
      category: 0,
      subunitName: "A-Tp",
      indepStateId: "01",
      integralStateId: "11"
    },
    {
      ser: 2,
      category: 0,
      subunitName: "B-Tp",
      indepStateId: "02",
      integralStateId: "12"
    },
    {
      ser: 3,
      category: 0,
      subunitName: "C-Tp",
      indepStateId: "03",
      integralStateId: "13"
    }
  ];

  secNameArr: sectorName[] = [
    { value: "Z", viewValue: "Zulu OP (Z)" },
    { value: "Y", viewValue: "Yankee OP (Y)" },
    { value: "X", viewValue: "X-ray OP (X)" },
    { value: "W", viewValue: "Whiskey OP (W)" },
    { value: "V", viewValue: "Victor OP (V)" },
    { value: "U", viewValue: "Uniform OP (U)" },
    { value: "T", viewValue: "Tango OP (T)" },
    { value: "S", viewValue: "Sierra OP (S)" },
    { value: "R", viewValue: "Romeo OP(R)" },
    { value: "Q", viewValue: "Quebec OP(Q)" },
    { value: "P", viewValue: "Papa OP(P)" }
  ];

  setSubunitCommandStatus(scs) {
    if (scs == "01") {
      this.scs1 = 0;
    } else if (scs == "11") {
      this.scs1 = 1;
    } else if (scs == "02") {
      this.scs2 = 0;
    } else if (scs == "12") {
      this.scs2 = 1;
    } else if (scs == "03") {
      this.scs3 = 0;
    } else if (scs == "13") {
      this.scs3 = 1;
    }
  }

  printUnit(lat, lng) {
    this.deployedElement = [];
    this.deployedElement.push(
      {
        lat: lat,
        lng: lng,
        color: "rgb(66, 134, 244)",
        rad: 2000
      },
      {
        lat: lat,
        lng: lng,
        color: "#f00",
        rad: 4500
      },
      {
        lat: lat,
        lng: lng,
        color: "rgb(66, 134, 244)",
        rad: 25000
      }
    );
  }

  printOP(opLat, opLng) {
    let index = this.opList.findIndex(p => p.sName == this.sectorName);
    if (index == -1) {
      let data = {
        lat: opLat,
        lng: opLng,
        sName: this.sectorName
      };
      this.opList.push(data);
    } else {
      this.opList[index].lat = opLat;
      this.opList[index].lng = opLng;
    }
  }

  setNextOp(sec) {
    if (sec == "Z") {
      this.sectorName = "Y";
    } else if (sec == "Y") {
      this.sectorName = "X";
    } else if (sec == "X") {
      this.sectorName = "W";
    } else if (sec == "W") {
      this.sectorName = "V";
    } else if (sec == "V") {
      this.sectorName = "U";
    } else if (sec == "U") {
      this.sectorName = "T";
    } else if (sec == "T") {
      this.sectorName = "S";
    } else if (sec == "S") {
      this.sectorName = "R";
    } else if (sec == "R") {
      this.sectorName = "Q";
    } else if (sec == "Q") {
      this.sectorName = "P";
    }
  }

  getLocation($event) {
    if (this.deplOpt == 1) {
      this.uLat = $event.coords.lat;
      this.uLng = $event.coords.lng;
      this.printUnit(this.uLat, this.uLng);
    } else {
      this.opLat = $event.coords.lat;
      this.opLng = $event.coords.lng;
      this.printOP(this.opLat, this.opLng);
    }
  }

  assignSubunitId(baseid) {
    let bid = parseInt(baseid);
    this.baseId = bid;
    this.subunitId1 = bid + 1;
    this.subunitId2 = bid + 2;
    this.subunitId3 = bid + 3;
  }
  submitDeploymentData(inputValue) {
    // Ser DeploymentId DeploymentDate ElementId lat lng isActive
    let data = {
      ElementId: this.baseId,
      ExName: inputValue.exName,
      lat: inputValue.uLat,
      lng: inputValue.uLng,
      queryId: "1"
    };
    console.log("Deploy Data", data);
    this.backendService.submitData(data).subscribe(result => {
      if (result) {
        this.deploymentId = result;
        this.backendResp_unitDepl = "Deployment Successful. Set Comd Status";
        console.log("Deploy Id", this.deploymentId);
      } else {
        console.log("No data...");
      }
    });
  }

  submitComdStatus() {
    let data = {
      ElementId: this.baseId,
      subunitId1: this.subunitId1,
      subunitId2: this.subunitId2,
      subunitId3: this.subunitId3,
      scs1: this.scs1,
      scs2: this.scs2,
      scs3: this.scs3,
      queryId: "2"
    };
    console.log("Cmd Status Data", data);
    this.backendService.submitData(data).subscribe(result => {
      if (result) {
        console.log("Cmd Status Resp : ", result);
        this.backendResp_cmdstatus = "Comd Status is Set Successfully. Depl OP";
      } else {
        console.log("No data...");
      }
    });
  }

  submitOPDeploymentData(inputValue) {
    // Ser DeploymentId DeploymentDate ElementId lat lng isActive
    if (this.deploymentId) {
      let data = {
        deploymentId: this.deploymentId,
        sectorName: inputValue.sectorName,
        opLat: inputValue.opLat,
        opLng: inputValue.opLng,
        opLtArc: inputValue.opLtArc,
        opRtArc: inputValue.opRtArc,
        queryId: "3"
      };
      console.log("OP Deploy Data", data);
      this.backendService.submitData(data).subscribe(result => {
        if (result) {
          this.sectorName = result;
          console.log("Returned Sector Id", this.sectorName);
          this.backendResp_opDepl = "OP Depl Successfully. Depl next OP";
          this.setNextOp(this.sectorName);
        } else {
          console.log("No data...");
        }
      });
    } else {
      confirm("No unit is deployed ....");
    }
  }

  deplType(val) {
    console.log(val);

    if (val == 2) {
      if (this.deploymentId) {
        this.deplOpt = val;
      } else {
        confirm("Please Deploy Unit First as per Ser (1) ....");
      }
    } else {
      this.deplOpt = val;
    }
  }

  

  ngOnInit() {
    this.arrCS = [];
    this.opList = [];
    let isIndep = this.authService.LoggedUserData(3);
    // this.baseId = this.authService.LoggedUserData(4);
    this.baseId =
      isIndep == 1
        ? this.authService.LoggedUserData(5)
        : this.authService.LoggedUserData(4);
    console.log("Indep : ", isIndep + " - " + this.baseId);
    this.mapViewMode = this.themeService.mapMode();
    this.baseId == 140
      ? (this.arrCS = this.arrCSMsl)
      : (this.arrCS = this.arrCSReg);
    this.assignSubunitId(this.baseId);
  }
}
