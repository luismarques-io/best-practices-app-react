import { faker } from '@faker-js/faker';

type Overrides = Record<string, any>;

export const userGenerator = (overrides?: Overrides) => ({
  id: faker.string.uuid(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  password: faker.internet.password(),
  gender: faker.person.sex(),
  image: faker.image.avatar(),
  ...overrides,
});

export const postGenerator = (overrides?: Overrides) => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraphs({ min: 3, max: 10 }),
  tags: faker.lorem.words(3).split(' '),
  reactions: faker.number.int({ min: 0, max: 100 }),
  createdAt: Date.now(),
  ...overrides,
});

export const commentGenerator = (overrides?: Overrides) => ({
  id: faker.string.uuid(),
  body: faker.lorem.paragraph(),
  createdAt: Date.now(),
  ...overrides,
});
