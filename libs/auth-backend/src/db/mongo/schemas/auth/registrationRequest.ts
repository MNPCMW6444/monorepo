import { getModel } from '@the-libs/base-backend';
import { SomeRequest } from '../../../../types';
import { requestBasicSchema } from './index';

export const registrationRequest = (userTypeRelevant: boolean = false) =>
  getModel<SomeRequest<true>>(
    'registrationRequest',
    requestBasicSchema(userTypeRelevant),
  );
