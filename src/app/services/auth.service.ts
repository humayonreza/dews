import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  // private baseUrl = "assets/backendDEWS/scripts/";
  private baseUrl = "http://localhost:8080/backendDEWS/scripts/";
  // private baseUrl = "https://app-dev.online/backendDEWS/scripts/";
  constructor(private http: Http, private router: Router) {}

  login(credentials) {
    // console.log("Login Cred : ", credentials);
    return this.http
      .post(this.baseUrl + "auth.php", JSON.stringify(credentials))
      .map(response => {
        let result = response.json();
        console.log("Login Resp : ", result);
        if (result && result != "401") {
          let mySplitResult = result.split(".");
          let loginData = mySplitResult[1];
          localStorage.setItem("token", loginData);
          console.log("Login Resp : ", loginData);
          return true;
        }
        return false;
      });
  }

  isLoggedIn() {
    let token = localStorage.getItem("token");
    if (!token) {
      return false;
    } else {
      return true;
    }
  }

  LoggedUserData(param) {
    let token = localStorage.getItem("token");
    if (!token) {
      return null;
    } else {
      let decodedString = atob(token);
      let str = JSON.parse(decodedString);
      // console.log("Your Full Name : ", str);
      let resp =
        param == 1
          ? str.userId
          : param == 2
          ? str.category
          : param == 3
          ? str.isIndependent
          : param == 4
          ? str.pid
          : param == 5
          ? str.uid
          : null;
      return resp;
      // isIndependent
    }
  }

  logout() {
    console.log("logout success...");
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }
}
