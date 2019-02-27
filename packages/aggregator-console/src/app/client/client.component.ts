import { OnInit, Component } from '@angular/core';
import { ClientService } from '../client/client.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {
  CLIENT_CREATED,
  CLIENT_ERROR,
  CLIENT_UPDATED,
  CLIENT_UPDATE_ERROR,
} from '../constants/messages';
import { NEW_ID } from '../constants/common';
import { CreateClientResponse } from '../interfaces/client-response.interface';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  uuid: string;
  clientId: string;
  webhookURL: string;
  userKey: string;
  licenseNumber: string;
  clientForm: FormGroup;

  constructor(
    private readonly clientService: ClientService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.uuid = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      clientId: this.clientId,
      webhookURL: this.webhookURL,
      userKey: this.userKey,
      licenseNumber: this.licenseNumber,
    });

    if (this.uuid && this.uuid !== NEW_ID) {
      this.subscribeGetClient(this.uuid);
    }
  }

  createCallbackURLFormGroup(callbackURL?: string): FormGroup {
    return this.formBuilder.group({
      callbackURL,
    });
  }

  subscribeGetClient(clientId: string) {
    this.clientService.getClient(clientId).subscribe({
      next: response => {
        if (response) {
          this.populateClientForm(response);
        }
      },
    });
  }

  registerClient() {
    this.clientService
      .registerClient<CreateClientResponse>(
        this.clientForm.controls.clientId.value,
        this.clientForm.controls.webhookURL.value,
        this.clientForm.controls.userKey.value,
        this.clientForm.controls.licenseNumber.value,
      )
      .subscribe({
        next: response => {
          this.snackbar.open(CLIENT_CREATED, 'Close', { duration: 2500 });
          this.router.navigateByUrl('/registered-client/list');
        },
        error: error => {
          this.snackbar.open(CLIENT_ERROR, 'Close', { duration: 2500 });
        },
      });
  }

  updateClientRegistration() {
    this.clientService
      .updateClientRegistration(
        this.clientForm.controls.clientId.value,
        this.clientForm.controls.webhookURL.value,
        this.clientForm.controls.userKey.value,
        this.clientForm.controls.licenseNumber.value,
      )
      .subscribe({
        next: response => {
          this.snackbar.open(CLIENT_UPDATED, 'Close', { duration: 2500 });
          this.router.navigateByUrl('/registered-client/list');
        },
        error: error => {
          this.snackbar.open(CLIENT_UPDATE_ERROR, 'Close', { duration: 2500 });
        },
      });
  }

  populateClientForm(client) {
    this.clientId = client.clientId;
    this.webhookURL = client.webhookURL;
    this.userKey = client.userKey;
    this.licenseNumber = client.licenseNumber;

    this.clientForm.controls.clientId.setValue(client.clientId);
    this.clientForm.controls.webhookURL.setValue(client.webhookURL);
    this.clientForm.controls.userKey.setValue(client.userKey);
    this.clientForm.controls.licenseNumber.setValue(client.licenseNumber);

    if (this.clientId) {
      this.clientForm.controls.clientId.disable();
    }
  }
}
