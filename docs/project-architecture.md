# Project Architecture

The majority of the code resides in the `src` folder, structured as follows:

```sh
src
|
+-- api               # API-related functions and utilities
|
+-- assets            # static files used across the entire application (images, fonts, etc.)
|
+-- components        # shared components used across the entire application
|
+-- config            # global configuration, env variables, etc., exported for application-wide use
|
+-- features          # feature-based modules
|
+-- hooks             # shared hooks used across the entire application
|
+-- layouts           # layout components used across the entire application
|
+-- lib               # re-exported libraries preconfigured for the application
|
+-- pages             # page components used in routing
|
+-- providers         # application providers
|
+-- routes            # routes configuration
|
+-- stores            # global state stores
|
+-- test              # test utilities and mock server
|
+-- utils             # shared utility functions
```

To ensure scalability and maintainability, the primary codebase is organized within the `features` folder. This folder contains feature-specific code, following a structured approach to keep functionalities isolated.

The structure of a typical `feature` is as follows:

```sh
src/features/awesome-feature
|
+-- api         # exported API request declarations and API hooks specific to the feature
|
+-- assets      # static files for the feature
|
+-- components  # components scoped to the feature
|
+-- hooks       # hooks scoped to the feature
|
+-- pages       # page components used in routing for the feature
|
+-- routes      # route components for the feature pages
|
+-- stores      # state stores for the feature
|
+-- types       # TypeScript types for the feature-specific domain
|
+-- utils       # utility functions for the feature
|
+-- index.ts    # entry point for the feature, serving as the public API and exporting all necessary features
```

The `index.ts` file of each feature acts as its public API, exporting everything that should be used outside the feature. When importing from other features, use:

```js
import { AwesomeComponent } from "@/features/awesome-feature";`
```

Avoid detailed paths like:

```js
import { AwesomeComponent } from '@/features/awesome-feature/components/AwesomeComponent';
```

To enforce this practice, consider configuring ESLint with the following rule:

```js
{
    rules: {
        'no-restricted-imports': [
            'error',
            {
                patterns: ['@/features/*/*'],
            },
        ],
    // ...rest of the configuration
}
```

This ensures cleaner and more maintainable import statements throughout the project.
