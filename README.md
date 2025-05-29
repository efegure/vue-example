# horse-racing

A very basic horse racing game done with vue 3 vuex and tailwindcss.

## Recommended setup

yarn recommended

node version: 22.14.0
yarn version: 1.22.22

### Install dependencies

```sh
yarn
```

### Dev build

```sh
yarn dev
```

### E2E test

```sh
yarn test:e2e
```

### Unit test

```sh
yarn test:unit
```

### Install browsers for the first run

```sh
yarn playwright install OR npx playwright install
```

### When testing on CI, must build the project first

```sh
yarn build
```

### Runs the tests only on Chromium

```sh
yarn test:e2e --project=chromium
```

### Runs the tests of a specific file

```sh
yarn test:e2e tests/example.spec.ts
```

### Runs the tests in debug mode

```sh
yarn test:e2e --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
