import { SetupService } from './setup/setup.service';
import { SettingsManagementService } from './settings-management/settings-management.service';

export const SystemSettingsAggregates = [
  SettingsManagementService,
  SetupService,
];
