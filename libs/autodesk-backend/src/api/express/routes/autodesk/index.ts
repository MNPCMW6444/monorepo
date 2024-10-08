import { getAutodeskToken } from '../../../../controllers/autodesk';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Router } = require('express');
const axios = require('axios');
const { stringify } = require('qs');
import { highOrderHandler } from '@the-libs/express-backend';
import { TODO } from '@the-libs/base-shared';

export const autodeskRouter = Router();

autodeskRouter.get(
  '/getToken',
  highOrderHandler((async () => {
    try {
      const credentials = await getAutodeskToken();
      if (credentials) {
        const response = await axios.post(
          credentials.Authentication ?? '',
          stringify(credentials.credentials),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        );
        return { statusCode: 200, body: { access_token: response.data } };
      }
    } catch (error) {
      throw new Error('Failed to authenticate with Autodesk');
    }
    return null;
  }) as TODO),
);
