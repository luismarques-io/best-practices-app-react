import { authHandlers } from './auth';
import { usersHandlers } from './users';

export const handlers = [...authHandlers, ...usersHandlers];
