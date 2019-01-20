import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SettingsService } from './settings.service';
import { AGGREGATOR_SERVICE, AGGREGATOR_CONSOLE } from '../constants/storage';
import { MatSnackBar } from '@angular/material';
import { UPDATE_SETTINGS_ERROR, SETTINGS_UPDATED } from '../constants/messages';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  issuerUrl: string;
  communicationServerClientId: string;
  consoleURL: string;
  consoleClientId: string;
  consoleClientSecret: string;
  serviceURL: string;
  serviceClientId: string;
  serviceClientSecret: string;
  hideConsoleSecret: boolean = true;
  hideServiceSecret: boolean = true;

  consoleForm = new FormGroup({
    appURL: new FormControl(this.consoleURL),
    clientId: new FormControl(this.consoleClientId),
    clientSecret: new FormControl(this.consoleClientSecret),
  });

  serviceForm = new FormGroup({
    appURL: new FormControl(this.serviceURL),
    clientId: new FormControl(this.serviceClientId),
    clientSecret: new FormControl(this.serviceClientSecret),
  });

  constructor(
    private settingsService: SettingsService,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.settingsService.getClientSettings(AGGREGATOR_CONSOLE).subscribe({
      next: consoleClient => {
        this.consoleURL = consoleClient.appURL;
        this.consoleClientId = consoleClient.clientId;
        this.consoleClientSecret = consoleClient.clientSecret;
        this.populateConsoleClientForm(consoleClient);
      },
    });

    this.settingsService.getClientSettings(AGGREGATOR_SERVICE).subscribe({
      next: serviceClient => {
        this.consoleURL = serviceClient.appURL;
        this.consoleClientId = serviceClient.clientId;
        this.consoleClientSecret = serviceClient.clientSecret;
        this.populateServiceClientForm(serviceClient);
      },
    });
  }

  populateForm(response) {
    this.serviceForm.controls.issuerUrl.setValue(response.issuerUrl);
    this.serviceForm.controls.communicationServerClientId.setValue(
      response.communicationServerClientId,
    );
  }

  populateConsoleClientForm(clientResponse) {
    this.consoleForm.controls.appURL.setValue(clientResponse.appURL);
    this.consoleForm.controls.clientId.setValue(clientResponse.clientId);
    this.consoleForm.controls.clientSecret.setValue(
      clientResponse.clientSecret,
    );
  }

  populateServiceClientForm(clientResponse) {
    this.serviceForm.controls.appURL.setValue(clientResponse.appURL);
    this.serviceForm.controls.clientId.setValue(clientResponse.clientId);
    this.serviceForm.controls.clientSecret.setValue(
      clientResponse.clientSecret,
    );
  }

  updateConsoleSettings() {
    this.settingsService
      .updateSettings(
        AGGREGATOR_CONSOLE,
        this.consoleForm.controls.appURL.value,
        this.consoleForm.controls.clientId.value,
        this.consoleForm.controls.clientSecret.value,
      )
      .subscribe({
        next: success => {
          this.snackbar.open(SETTINGS_UPDATED, 'Close', { duration: 2500 });
        },
        error: fail => {
          this.snackbar.open(UPDATE_SETTINGS_ERROR, 'Close', {
            duration: 2500,
          });
        },
      });
  }

  updateServiceSettings() {
    this.settingsService
      .updateSettings(
        AGGREGATOR_SERVICE,
        this.serviceForm.controls.appURL.value,
        this.serviceForm.controls.clientId.value,
        this.serviceForm.controls.clientSecret.value,
      )
      .subscribe({
        next: success => {
          this.snackbar.open(SETTINGS_UPDATED, 'Close', { duration: 2500 });
        },
        error: fail => {
          this.snackbar.open(UPDATE_SETTINGS_ERROR, 'Close', {
            duration: 2500,
          });
        },
      });
  }
}
