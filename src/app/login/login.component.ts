import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { BackendService } from "../services/backend.service";
import { LayoutService } from "../services/layout.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  category: number;
  loggedUnit: number;
  constructor(private router: Router, private authService: AuthService) {}
  //
  signIn(credentials) {
    this.authService.login(credentials).subscribe(result => {
      console.log("Result 101 : ", result);
      if (result) {
        this.invalidLogin = false;
        let category = this.authService.LoggedUserData(2);
        category == 1
          ? this.router.navigate(["/"])
          : category == 2 || category == 4
          ? this.router.navigate(["/adcp"])
          : category == 3
          ? this.router.navigate(["/encon"])
          : category == 5
          ? this.router.navigate(["/adoc"])
          : category == 6
          ? this.router.navigate(["/tts"])
          : null;

        // this.selectRouter(this.category);
      } else this.invalidLogin = true;
    });
  }
  ngOnInit() {}
}
