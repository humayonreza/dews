import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class LayoutService {
  // private baseUrl = "assets/backendDEWS/scripts/";
  private baseUrl = "http://localhost:8080/backendDEWS/scripts/";
  // private baseUrl = "https://app-dev.online/backendDEWS/scripts/";

  constructor(private http: Http) {}
  arrDeplElmData: any[];
  arrRerutnDeplData: any[];
  arrLabels: any[];
  arrAdunits: any[];
  arrOwnRadar: any[] = [];
  arrEnAirBase: any[] = [];
  //
  getDeplElmData(data) {
    this.arrLabels = [];
    return this.http
      .post(this.baseUrl + "backend_service.php", JSON.stringify(data))
      .map(response => {
        let result = response.json();
        if (result && result != "401") {
          this.arrDeplElmData = result;
          console.log("Full Array Except RADAR : ", this.arrDeplElmData);
          return "200";
        }
        return "401";
      });
  }

  getRadarDeplData(data) {
    console.log("Param Radar : ", data);
    return this.http
      .post(this.baseUrl + "backend_service.php", JSON.stringify(data))
      .map(response => {
        let result = response.json();
        if (result && result != "401") {
          // this.arrDeplElmData = result;
          console.log("Full Array RADAR : ", result);
          return response.json();
        }
        return "401";
      });
  }

  createArrOwnRadar() {
    this.arrOwnRadar = this.arrDeplElmData.filter(m => m.Type == 6);
    console.log("Array Radar List 009:", this.arrOwnRadar);
  }
  printDeplElementLoc() {
    return this.arrRerutnDeplData;
  }
  printDeplElmLabel() {
    return this.arrLabels;
  }
  returnArrAdunits() {
    return this.arrAdunits;
  }
  returnArrOwnRadar() {
    return this.arrOwnRadar;
  }
  returnArrEnAirbase() {
    return this.arrEnAirBase;
  }
  getBaseLatLng(baseId) {
    for (let i = 0; i < this.arrDeplElmData.length; i++) {
      if (this.arrDeplElmData[i].ElementId == baseId) {
        let data = {
          lat: this.arrDeplElmData[i].lat,
          lng: this.arrDeplElmData[i].lng
        };
        return data;
      }
    }
  }

  getLoggedUnitPosn(data) {
    // console.log("Logged Unit Id : ", data);
    return this.http
      .post(this.baseUrl + "backend_service.php", JSON.stringify(data))
      .map(response => {
        let result = response.json();
        // console.log("Login Resp : ", result);
        if (result && result != "401") {
          return result;
        }
        return "401";
      });
  }

  createArrLabels(loggedClientId, category) {
    for (let i = 0; i < this.arrDeplElmData.length; i++) {
      if (
        (category == 2 || category == 4) &&
        loggedClientId == this.arrDeplElmData[i].ElementId
      ) {
        let data = {
          deploymentId: this.arrDeplElmData[i].DeploymentId,
          elementId: this.arrDeplElmData[i].ElementId,
          elementName: this.arrDeplElmData[i].ElementName,
          origin: this.arrDeplElmData[i].Origin,
          lat: parseFloat(this.arrDeplElmData[i].lat) - 0.3,
          lng: parseFloat(this.arrDeplElmData[i].lng)
        };
        this.arrLabels.push(data);
      } else {
        let data = {
          deploymentId: this.arrDeplElmData[i].DeploymentId,
          elementId: this.arrDeplElmData[i].ElementId,
          elementName: this.arrDeplElmData[i].ElementName,
          origin: this.arrDeplElmData[i].Origin,
          lat: parseFloat(this.arrDeplElmData[i].lat) - 0.2,
          lng: parseFloat(this.arrDeplElmData[i].lng)
        };
        this.arrLabels.push(data);
      }
    }
  }

  createArrElements(loggedClientId, clientCategory) {
    for (let i = 0; i < this.arrDeplElmData.length; i++) {
      let index = i;
      if (clientCategory == 2 || clientCategory == 4) {
        if (loggedClientId == this.arrDeplElmData[index].ElementId) {
          for (let i = 0; i < 3; i++) {
            let radius = i == 0 ? 2000 : i == 1 ? 20000 : i == 2 ? 26000 : 0;
            let data = {
              elementId: this.arrDeplElmData[index].ElementId,
              elementName: this.arrDeplElmData[index].ElementName,
              origin: this.arrDeplElmData[index].Origin,
              lat: parseFloat(this.arrDeplElmData[index].lat),
              lng: parseFloat(this.arrDeplElmData[index].lng),
              rad: radius
            };
            this.arrRerutnDeplData.push(data);
          }
        } else {
          for (let i = 0; i < 2; i++) {
            let radius = i == 0 ? 2000 : i == 1 ? 15000 : 0;
            let data = {
              elementId: this.arrDeplElmData[index].ElementId,
              elementName: this.arrDeplElmData[index].ElementName,
              origin: this.arrDeplElmData[index].Origin,
              lat: parseFloat(this.arrDeplElmData[index].lat),
              lng: parseFloat(this.arrDeplElmData[index].lng),
              rad: radius
            };
            this.arrRerutnDeplData.push(data);
          }
        }
      } else {
        for (let i = 0; i < 2; i++) {
          let radius = i == 0 ? 2000 : i == 1 ? 15000 : 0;
          let data = {
            elementId: this.arrDeplElmData[index].ElementId,
            elementName: this.arrDeplElmData[index].ElementName,
            origin: this.arrDeplElmData[index].Origin,
            lat: parseFloat(this.arrDeplElmData[index].lat),
            lng: parseFloat(this.arrDeplElmData[index].lng),
            rad: radius
          };
          this.arrRerutnDeplData.push(data);
        }
      }
    }
  }
  createArrAdunits() {
    for (let i = 0; i < this.arrDeplElmData.length; i++) {
      let index = i;
      if (this.arrDeplElmData[index].Origin == 1) {
        let data = {
          elementId: this.arrDeplElmData[index].ElementId,
          elementName: this.arrDeplElmData[index].ElementName,
          origin: this.arrDeplElmData[index].Origin,
          lat: parseFloat(this.arrDeplElmData[index].lat),
          lng: parseFloat(this.arrDeplElmData[index].lng),
          conorderId: 1
        };
        this.arrAdunits.push(data);
      }
    }
  }

  createArrEnAirBase() {
    this.arrEnAirBase = this.arrDeplElmData.filter(m => m.Type == 2);
    console.log("Array En Air Base List 100:", this.arrEnAirBase);
  }

  //
  layout(loggedClientId, clientCategory) {
    this.arrRerutnDeplData = [];
    this.arrAdunits = [];
    this.arrLabels = [];
    this.createArrLabels(loggedClientId, clientCategory);
    this.createArrElements(loggedClientId, clientCategory);
    this.createArrAdunits();
    this.createArrOwnRadar();
    this.createArrEnAirBase();
  }
  submitData(data) {
    console.log("Deploy Data 01", data);
    return this.http
      .post(this.baseUrl + "backend_service.php", JSON.stringify(data))
      .map(response => {
        if (response.json() && response.json() != "401") {
          console.log("Resp : ", response.json());
          return response.json();
        } else return false;
      });
  }
}
