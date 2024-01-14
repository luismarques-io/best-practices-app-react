import { rest } from 'msw';
import path from 'path';
import { nanoid } from 'nanoid';

import { API_URL } from '@/config';

import { db, persistDb } from '../db';
import { requireAuth, delayedResponse } from '../utils';

type CreateCommentBody = {
  body: string;
  postId: string;
  user: {
    id: string;
    username: string;
  };
};

export const commentsHandlers = [
  rest.get(path.join(API_URL, '/comments/post/:postId'), async (req, res, ctx) => {
    try {
      const { postId } = req.params;
      const limit = Number(req.url.searchParams.get('limit') || 0);
      const skip = Number(req.url.searchParams.get('skip') || 0);
      const where = {
        postId: {
          equals: postId as string,
        },
      };
      const comments = db.comment.findMany({ where, take: limit, skip });
      const total = db.comment.count({ where });

      const result = {
        comments,
        total,
        skip,
        limit,
      };

      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message || 'Server Error' }));
    }
  }),

  rest.post<CreateCommentBody>(path.join(API_URL, '/comments/add'), async (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = await req.json();
      const result = db.comment.create({
        user: {
          id: user.id,
          username: user.username,
        },
        id: nanoid(),
        createdAt: Date.now(),
        ...data,
      });
      persistDb('comment');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message || 'Server Error' }));
    }
  }),

  rest.put<CreateCommentBody>(path.join(API_URL, '/comments/:commentId'), async (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = await req.json();
      const { commentId } = req.params;
      const result = db.comment.update({
        where: {
          id: {
            equals: commentId as string,
          },
          user: {
            id: { equals: user.id },
          },
        },
        data,
      });
      persistDb('comment');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message || 'Server Error' }));
    }
  }),

  rest.delete(path.join(API_URL, '/comments/:commentId'), async (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const { commentId } = req.params;
      const result = db.comment.delete({
        where: {
          id: {
            equals: commentId as string,
          },
          user: {
            id: { equals: user.id },
          },
        },
      });
      persistDb('comment');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message || 'Server Error' }));
    }
  }),
];
