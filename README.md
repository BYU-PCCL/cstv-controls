# footron-controls

## Installation

Update to Yarn 2 (see
[Yarn docs](https://yarnpkg.com/getting-started/install#updating-to-the-latest-versions)
for background):

```sh
yarn set version berry
```

Install packages:

```sh
yarn install
```

Unplug `open` so Storybook
works ([Github issue](https://github.com/storybookjs/storybook/issues/13531#issuecomment-751894259)):

```sh
yarn unplug open -AR
```

## Running

Start server:

```sh
yarn start
```

Build for production:

```sh
yarn build
```

Run tests:

```sh
yarn test
```

Run storybook:

```sh
yarn storybook
```
