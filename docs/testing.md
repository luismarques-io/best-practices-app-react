# Testing

The testing strategy in this project emphasizes integration and end-to-end (E2E) tests, providing higher confidence in the application's functionality compared to unit tests.

## Types of tests

### Unit Tests

Unit testing involves testing individual units of an application in isolation, validating their behavior and functionality.

[Example Code](../src/features/auth/hooks/__tests__/useIsCurrentUser.test.ts)

### Integration Tests

Integration testing assesses multiple parts of an application simultaneously. Given its comprehensive nature, the majority of tests in this project are integration tests, delivering substantial benefits and confidence in the application's integrity.

[Example Code](../src/features/comments/components/__tests__/Comments.test.tsx)

### E2E

E2E testing evaluates the application as a complete entity, simulating user interactions with both the frontend and backend. These tests are written to mimic the application's actual usage by end-users.

[Example Code](../cypress/e2e/smoke.cy.ts)

You can also write custom commands to abstract some common tasks:

[Example Code](../cypress/support/commands.ts)

## Tooling

- [Jest](https://jestjs.io/): A comprehensive testing framework for JavaScript.
- [Testing Library](https://testing-library.com/): A set of libraries and tools that facilitate UI component testing in a user-centric manner.
- [Cypress](https://www.cypress.io/): Cypress is an E2E testing tool for running tests in an automated manner.
- [MSW (Mock Service Worker)](https://mswjs.io): An API mocking library that enables client-agnostic mocks.

Having a fully functional mocked API server, facilitated by MSW, proves advantageous in testing. It eliminates the need to mock fetch, allowing requests to be made to the mocked server with the expected data, streamlining the testing process.
