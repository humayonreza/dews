import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { BackendService } from "../services/backend.service";
// import { getDefaultService } from "selenium-webdriver/chrome";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  userId: string;
  arrMenu: any[];
  constructor(
    private router: Router,
    public authService: AuthService,
    private backendService: BackendService
  ) {}

  userLogout() {
    this.authService.logout();
  }

  getUser() {
    let token = localStorage.getItem("token");
    if (!token) {
      this.userId = "Guest";
    } else {
      let decodedString = atob(token);
      let str = JSON.parse(decodedString);
      console.log("Your Full Name : ", str.userId);
      this.userId = str.userId;
      let data = {
        menuId: str.menuId,
        queryId: 0
      };
      this.backendService.getMenuList(data).subscribe(result => {
        this.arrMenu = [];
        this.arrMenu = result;
        console.log("Menu List: ", this.arrMenu);
      });
    }
  }

  ngOnInit() {
    this.getUser();
  }
}
