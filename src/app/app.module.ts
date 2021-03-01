import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { Router, RouterModule } from "@angular/router";
import { AgmCoreModule } from "@agm/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SpeechSynthesisModule } from "@kamiazya/ngx-speech-synthesis";

import { MenuComponent } from "./menu/menu.component";
import { DeplcpComponent } from "./depl/deplcp/deplcp.component";
import { DeplradarComponent } from "./depl/deplradar/deplradar.component";
import { DeplenairbaseComponent } from "./depl/deplenairbase/deplenairbase.component";
import { AdcpComponent } from "./dashboard/adcp/adcp.component";
import { AdocComponent } from "./dashboard/adoc/adoc.component";
import { EnconComponent } from "./dashboard/encon/encon.component";
import { LoginComponent } from "./login/login.component";
// Angular Component List
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatStepperModule } from "@angular/material/stepper";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatBadgeModule } from "@angular/material/badge";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSortModule } from "@angular/material/sort";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDialogModule } from "@angular/material/dialog";
import { CreateattkComponent } from "./depl/createattk/createattk.component";
import { ReportadcpComponent } from "./reports/reportadcp/reportadcp.component";
import { ReportadocComponent } from "./reports/reportadoc/reportadoc.component";
import { ReportenairconComponent } from "./reports/reportenaircon/reportenaircon.component";
import { ReportradaroprComponent } from "./reports/reportradaropr/reportradaropr.component";
import { Wolf1Component } from "./dashboard/bases/wolf1/wolf1.component";
import { Wolf2Component } from "./dashboard/bases/wolf2/wolf2.component";
import { Wolf3Component } from "./dashboard/bases/wolf3/wolf3.component";
// import { RadaroprComponent } from "./dashboard/radaropr/radaropr.component";
import { TestComponent } from "./dashboard/test/test.component";

// ======================

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DeplcpComponent,
    DeplradarComponent,
    DeplenairbaseComponent,
    AdcpComponent,
    AdocComponent,
    EnconComponent,
    LoginComponent,
    CreateattkComponent,
    ReportadcpComponent,
    ReportadocComponent,
    ReportenairconComponent,
    ReportradaroprComponent,
    Wolf1Component,
    Wolf2Component,
    Wolf3Component,
    // RadaroprComponent,
    TestComponent
  ],
  imports: [
    MatAutocompleteModule,
    MatExpansionModule,
    MatStepperModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatBadgeModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSortModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatDialogModule,
    HttpModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SpeechSynthesisModule.forRoot({
      lang: "en",
      volume: 1.0,
      pitch: 2.0,
      rate: 1.5
    }),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAfg8zhSwZoTzVK_QVt37pANL-KSOqE9mA"
    }),
    RouterModule.forRoot(
      [
        // {
        //   path: "",
        //   component: LoginComponent
        // },
        {
          path: "",
          component: LoginComponent
        },
        {
          path: "encon",
          component: EnconComponent
        },
        {
          path: "adoc",
          component: AdocComponent
        },
        {
          path: "adcp",
          component: AdcpComponent
        },

        {
          path: "tts",
          component: TestComponent
        },
        {
          path: "deplcp",
          component: DeplcpComponent
        },
        {
          path: "reportadcp",
          component: ReportadcpComponent
        },
        {
          path: "deplradar",
          component: DeplradarComponent
        },
        {
          path: "reportadoc",
          component: ReportadocComponent
        },
        {
          path: "enaircon",
          component: EnconComponent
        },
        {
          path: "deplenairbase",
          component: DeplenairbaseComponent
        },
        {
          path: "createattk",
          component: CreateattkComponent
        },
        {
          path: "reportenaircon",
          component: ReportenairconComponent
        },
        {
          path: "reportradaropr",
          component: ReportradaroprComponent
        },
        {
          path: "wolf1",
          component: Wolf1Component
        }
      ],
      { onSameUrlNavigation: "reload" }
    )
  ],
  // enaircon
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
