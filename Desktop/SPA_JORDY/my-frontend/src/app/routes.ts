import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { InfoComponent } from './info/info.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddGameComponent } from './add-game/add-game.component';
import { AddDeveloperComponent } from './add-developer/add-developer.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {AuthGuard} from './auth/auth.guard';

export const appRoutes: Routes = [
    {
      path: 'home', component: InfoComponent,
    },
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'signin', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'addCompany', component: AddCompanyComponent,canActivate:[AuthGuard]
    },
    {
        path: 'view', component: UserProfileComponent
    },
    {
        path: 'addDeveloper', component: AddDeveloperComponent,canActivate:[AuthGuard]
    },
    {
        path: 'addGame', component: AddGameComponent,canActivate:[AuthGuard]
    },
    {
        path: 'info', component: InfoComponent
    },
    {
        path: '', redirectTo: '/view', pathMatch: 'full'
    }
];
