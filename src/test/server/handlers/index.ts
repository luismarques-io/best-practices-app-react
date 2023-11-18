import { authHandlers } from './auth';
import { usersHandlers } from './users';
import { commentsHandlers } from './comments';
import { postsHandlers } from './posts';

export const handlers = [...authHandlers, ...usersHandlers, ...commentsHandlers, ...postsHandlers];
