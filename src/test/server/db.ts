import { factory, primaryKey, nullable } from '@mswjs/data';

const models = {
  user: {
    id: primaryKey(String),
    username: String,
    email: String,
    firstName: nullable(String),
    lastName: nullable(String),
    gender: nullable(String),
    image: nullable(String),
    password: String,
    terms: Boolean,
    createdAt: Number,
  },
  post: {
    id: primaryKey(String),
    title: String,
    body: String,
    tags: Array,
    userId: String,
    reactions: Number,
    createdAt: Number,
  },
  comment: {
    id: primaryKey(String),
    body: String,
    postId: String,
    createdAt: Number,
    user: {
      id: String,
      username: String,
    },
  },
};

export const db = factory(models);

// export type Model = keyof typeof db;
export type Model = keyof typeof models;

export const loadDb = () => Object.assign(JSON.parse(window.localStorage.getItem('msw-db') || '{}'));

export const persistDb = (model: Model) => {
  if (process.env.NODE_ENV === 'test') return;
  const data = loadDb();
  data[model] = db[model].getAll();
  window.localStorage.setItem('msw-db', JSON.stringify(data));
};

export const initializeDb = () => {
  const database = loadDb();
  Object.entries(db).forEach(([key, model]) => {
    const dataEntres = database[key];
    if (dataEntres) {
      dataEntres?.forEach((entry: Record<string, any>) => {
        model.create(entry);
      });
    }
  });
};

export const resetDb = () => {
  window.localStorage.clear();
};

initializeDb();
