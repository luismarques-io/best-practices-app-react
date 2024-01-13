import { rest } from 'msw';
import { nanoid } from 'nanoid';

import { API_URL } from '../../../config';

import { db, persistDb } from '../db';
import { authenticate, delayedResponse, hash, requireAuth } from '../utils';
import path from 'path';

type RegisterBody = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  password: string;
  terms: boolean;
};

type LoginBody = {
  username: string;
  password: string;
};

export const authHandlers = [
  // rest.post<RegisterBody>(path.join(API_URL, '/auth/register'), async (req, res, ctx) => {
  rest.post<RegisterBody>(path.join(API_URL, '/users/add'), async (req, res, ctx) => {
    try {
      const userObject = await req.json();

      const existingUser = db.user.findFirst({
        where: {
          username: {
            equals: userObject.username,
          },
        },
      });

      if (existingUser) {
        throw new Error('The user already exists');
      }

      db.user.create({
        ...userObject,
        id: nanoid(),
        createdAt: Date.now(),
        password: hash(userObject.password),
      });

      persistDb('user');

      const result = authenticate({ username: userObject.username, password: userObject.password });

      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message || 'Server Error' }));
    }
  }),

  rest.post<LoginBody>(path.join(API_URL, '/auth/login'), async (req, res, ctx) => {
    try {
      const credentials = await req.json();

      // TODO: Use /auth/me instead (credentials.loginToken is a boolean to indicate the temporary workaround)
      if (credentials.loginToken) {
        const user = requireAuth(req);
        return delayedResponse(ctx.json({ ...user, token: req.headers.get('authorization') }));
      }

      const { user, jwt: token } = authenticate(credentials);
      return delayedResponse(ctx.json({ ...user, token }));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message || 'Server Error' }));
    }
  }),

  rest.get(path.join(API_URL, '/auth/users/:userId'), (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      return delayedResponse(ctx.json(user));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message || 'Server Error' }));
    }
  }),
  rest.get(path.join(API_URL, '/auth/users/'), (req, res, ctx) => {
    try {
      const user = requireAuth(req);

      return delayedResponse(ctx.json(user));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message || 'Server Error' }));
    }
  }),
];
