import { SETTINGS_ALREADY_EXISTS } from './messages';
import { HttpStatus, HttpException } from '@nestjs/common';

export const settingsAlreadyExists = new HttpException(
  SETTINGS_ALREADY_EXISTS,
  HttpStatus.BAD_REQUEST,
);
