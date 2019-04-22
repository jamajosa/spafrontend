import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {SlideshowModule} from 'ng-simple-slideshow';
import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import { InfoComponent } from './info/info.component';
import { FooterComponent } from './info/footer/footer.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserService } from '../services/user.service';
import { GameService } from '../services/game.service';
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import {AuthGuard} from './auth/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddGameComponent } from './add-game/add-game.component';
import { AddDeveloperComponent } from './add-developer/add-developer.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    InfoComponent,
    FooterComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    AddGameComponent,
    AddDeveloperComponent,
    AddCompanyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SlideshowModule,
    NgxPaginationModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  providers: [AuthGuard,UserService,GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
