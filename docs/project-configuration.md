# Project Configuration

This application is initialized using `Create React App` for its simplicity, allowing rapid development without intricate tooling setup such as bundling and transpiling.

The following essential tools should be configured and utilized:

## ESLint

ESLint, a linting tool for JavaScript and TypeScript, plays a crucial role in preventing common mistakes and maintaining code consistency. The specific configuration is defined in the [`.eslintrc.js`](../.eslintrc.js) file.

## Prettier

Prettier is a powerful code formatting tool that enforces a consistent code style throughout your entire codebase. Leveraging the "format on save" feature in your IDE, you can automatically format code based on the configuration in [`.prettierrc.json`](../.prettierrc.json).

## TypeScript

TypeScript, a statically typed superset of JavaScript, enhances code quality by adding types to the language. It becomes especially valuable during large refactors, catching issues that might be overlooked otherwise.

## Absolute imports

Configuring and using absolute imports simplifies file movement and avoids convoluted import paths like `../../../Component`. Regardless of file relocation, absolute imports ensure that all import paths remain intact. The TypeScript (`tsconfig.json`) and JavaScript (`jsconfig.json`) projects should include the following configuration:

```json
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
```

Refer to the [Paths Configuration Example Code](../tsconfig.paths.json) for a sample implementation. In this project, a separate `tsconfig.paths.json` file is created to configure paths and merge it with the base configuration, preventing potential overrides by CRA.

While it's possible to define multiple paths for different folders (e.g., `@components`, `@hooks`), using `@/*` is recommended for simplicity. This approach works well as it is short, eliminating the need for configuring multiple paths, and distinguishes our source folder from other dependency modules in node_modules. Therefore, anything within the src folder can be accessed via `@`, allowing easy access to files like `@/components/MyComponent`.
