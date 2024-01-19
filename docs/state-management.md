# State Management

In this project, state management is categorized into several types.

## Component State

This type of state is specific to a component and isn't intended to be shared elsewhere. However, you can pass it as a prop to children components when necessary. Typically, starting with component state is recommended, and if needed elsewhere, you can lift the state up.

Used in this project:

- [useState](https://react.dev/reference/react/useState): for simpler, independent states

Other options:

- [useReducer](https://react.dev/reference/react/useReducer): for more complex states where a single action updates several pieces of state

[Example Code](../src/components/Form/DebouncedInputField.tsx)

## Global State

Global state is shared across multiple components and is managed using a state management library. For optimal performance and maintainability, it's advised to keep the state close to the components using it, rather than making everything global from the start.

Used in this project:

- [Redux](https://redux.js.org/) + [Redux Toolkit](https://redux-toolkit.js.org/)

[Example Code](../src/features/auth/stores/authSlice.ts)

## Server Cache State

This type of state originates from the server and is cached on the client for future use. While it's possible to store remote data inside a state management store like Redux, there are specialized solutions for this purpose.

Used in this project:

- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)

Other options:

- [react-query](https://react-query.tanstack.com/)
- [swr](https://swr.vercel.app/)
- [apollo client](https://www.apollographql.com/)
- [urql](https://formidable.com/open-source/urql/)

[Example Code](../src/features/post/api/postApi.ts)

## Form State

This type of state tracks user inputs in a form.

Used in this project:

- [React Hook Form](https://react-hook-form.com/)

Other options:

- [Formik](https://formik.org/)
- [React Final Form](https://github.com/final-form/react-final-form)

You can integrate validation libraries with these solutions for client-side input validation. Some good options include:

- [yup](https://github.com/jquense/yup) (Used in this project)
- [zod](https://github.com/colinhacks/zod)

[Example Code](../src/features/post/components/PostEditor.tsx)

## URL State

Certain state can be stored in the URL as query parameters, often used for things like filters and pagination in lists.

This state is typically tracked via URL params (`/app/${dynamicParam}`) or query params (`/app?dynamicParam=1`). Access and control can be managed through your routing solution, such as `react-router-dom`.

[Example Code](../src/features/post/routes/PostRoutes.tsx)

## Persistent State

Some state needs to persist across browser sessions and is stored in `localStorage` or `sessionStorage`.

[Example Code](../src/utils/storage.ts)
