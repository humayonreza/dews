import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class BackendService {
  // private baseUrl = "assets/backendDEWS/scripts/";
  private baseUrl = "http://localhost:8080/backendDEWS/scripts/";
  // private baseUrl = "https://app-dev.online/backendDEWS/scripts/";

  constructor(private http: Http) {}

  getMenuList(data) {
    return this.http
      .post(this.baseUrl + "backend_service.php", JSON.stringify(data))
      .map(response => {
        let result = response.json();
        console.log("Login Resp : ", result);
        if (result && result != "401") {
          return result;
        }
        return "401";
      });
  }

  submitData(data) {
    console.log("Deploy Data : ", data);
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
