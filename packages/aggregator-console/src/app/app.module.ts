import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ListingComponent } from './listing/listing.component';
import { ClientComponent } from './client/client.component';
import { AppService } from './app.service';
import { ClientService } from './client/client.service';
import { SettingsComponent } from './settings/settings.component';
import { SettingsService } from './settings/settings.service';
import { AuthService } from './common/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    ListingComponent,
    ClientComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    OAuthModule.forRoot(),
    MaterialModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    FlexLayoutModule,
  ],
  providers: [
    AppService,
    {
      provide: OAuthStorage,
      useValue: localStorage,
    },
    ClientService,
    SettingsService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
