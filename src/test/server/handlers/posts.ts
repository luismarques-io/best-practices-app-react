import { rest } from 'msw';
import path from 'path';
import { nanoid } from 'nanoid';

import { API_URL } from '../../../config';

import { db, persistDb } from '../db';
import { requireAuth, delayedResponse } from '../utils';

type CreatePostBody = {
  body: string;
  postId: string;
  userId: string;
};

export const postsHandlers = [
  rest.get(path.join(API_URL, 'posts/search'), async (req, res, ctx) => {
    try {
      const { userId } = req.params;
      // const query = req.url.searchParams.get('q') || '';
      // const limit = req.url.searchParams.get('limit') || '';
      // const skip = req.url.searchParams.get('skip') || '';
      const result = db.post.findMany({
        where: {
          userId: {
            equals: userId as string,
          },
        },
      });

      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message || 'Server Error' }));
    }
  }),

  rest.get(path.join(API_URL, 'users/:userId/posts/'), async (req, res, ctx) => {
    try {
      const { userId } = req.params;
      // const limit = req.url.searchParams.get('limit') || '';
      // const skip = req.url.searchParams.get('skip') || '';
      const result = db.post.findMany({
        where: {
          userId: {
            equals: userId as string,
          },
        },
      });
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message || 'Server Error' }));
    }
  }),

  rest.get(path.join(API_URL, 'posts/:postId'), async (req, res, ctx) => {
    try {
      const { postId } = req.params;
      const result = db.post.findFirst({
        where: {
          id: {
            equals: postId as string,
          },
        },
      });
      if (!result) {
        return delayedResponse(ctx.status(404), ctx.json({ message: `Post with id '${postId}' not found` }));
      }
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message || 'Server Error' }));
    }
  }),

  rest.post<CreatePostBody>(path.join(API_URL, '/posts/add'), async (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = await req.json();
      const result = db.post.create({
        userId: user.id,
        id: nanoid(),
        createdAt: Date.now(),
        ...data,
      });
      persistDb('post');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message || 'Server Error' }));
    }
  }),

  rest.put<CreatePostBody>(path.join(API_URL, '/posts/:postId'), async (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = await req.json();
      const { postId } = req.params;
      const result = db.post.update({
        where: {
          id: {
            equals: postId as string,
          },
          userId: {
            equals: user.id,
          },
        },
        data,
      });
      persistDb('post');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message || 'Server Error' }));
    }
  }),

  rest.delete(path.join(API_URL, '/posts/:postId'), async (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const { postId } = req.params;
      const result = db.post.delete({
        where: {
          id: {
            equals: postId as string,
          },
          userId: {
            equals: user.id,
          },
        },
      });
      persistDb('post');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message || 'Server Error' }));
    }
  }),
];
