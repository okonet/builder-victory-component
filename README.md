[![Travis Status][trav_img]][trav_site]

Builder Archetype: Victory Component
==================================

A Victory component archetype for [builder][]. See the [development guide][]
for workflows in components using this archetype.

## Installation

To use the production and development workflows, install both this package
and the development module:

```sh
$ npm install --save builder-victory-component
$ npm install --save-dev builder-victory-component-dev
```

## Generator

To bootstrap a new project from scratch with template files from this
archetype, you can use [builder-init][]:

```sh
$ npm install -g builder-init
$ builder-init builder-victory-component
```

This will download this archetype, prompt you for several template data values
and inflate the [archetype templates][] to real files at a chosen directory.


## Project Structure

This archetype assumes an architecture as follows:

```
.
├── .builderrc                  # Configures builder archetype
├── .eslintrc                   # Configures eslint
├── package.json
├── demo                        # Component demo
│   ├── app.jsx
│   └── index.html
├── docs                        # Ecology documentation
│   ├── README.md
│   ├── app.jsx
│   ├── docs.jsx
│   ├── ecology.md
│   ├── index.html
│   ├── static-index.jsx
│   └── static-render-entry.jsx
├── dist                        # Distribution build destination (standalone)
├── lib                         # Lib build destination (npm)
├── src                         # Component source
│   ├── components
│   │   └── *.jsx?
│   └── index.js
└── test                        # Component tests
    └── .eslintrc               # Configures eslint for tests
    └── client
        ├── main.js
        ├── spec
        │   └── components
        │       └── *.jsx?
        └── test.html
```


An example project using this structure is [victory-chart][].

## Component Name Inference

The `name` field in `package.json` (the published `npm` package name) is
assumed to be:

1. The desired file name of the distribution files and dash-cased.
2. The desired default exported class name when converted to CapitalCamelCase.

So, if a `package.json` has:

```js
{
  "name": "victory-heatmap"
}
```

The distribution files to output are:

```
dist/victory-heatmap.js
dist/victory-heatmap.js.map
dist/victory-heatmap.min.js
dist/victory-heatmap.min.js.map
```

and the exported class name is `VictoryHeatmap`.

## Usage Notes

### Eslint

The implementing project will need to add an `.eslintrc` file in the root
which should extend the archetype eslint configuration. Another `.eslintrc` file
should be placed in the `test/` directory, extending the test eslint configuration.
The presence of these files ensures support for most editor and IDE lint plugins.

These files will be added automatically when generating a new Victory component
using `builder-init builder-victory-component`:

```yaml
--- # <ROOT>/.eslintrc
  extends: ./node_modules/builder-victory-component/config/eslint/.eslintrc-source
```

```yaml
--- # <ROOT>/test/.eslintrc
  extends: ../node_modules/builder-victory-component/config/eslint/.eslintrc-test
```

### Babel Configuration

This archetype contains a `config/babel/.babelrc` meant for your project to extend
by putting this in your project root `.babelrc`:

```
{
  "extends": "./node_modules/builder-victory-component/config/babel/.babelrc"
}
```

If you want to override some options, you can do so by adding custom configuration
values to your `.babelrc`. See [http://babeljs.io/docs/usage/options/][].

### `peerDependencies`

This archetype is meant to be used in a very specific context: A Victory component. As such, it's assumed that the implementing component bring along these dependencies:
- `react` & `react-dom 0.14+`
- Most Victory components will also want to depend on `radium 0.16+``.

The reason we don't specify these in the archetype `package.json`'s `peerDependencies` is to lower the friction to testing out `beta` builds of React by specifying a `peer` of `react 0.14.x`. Similarly, specifying a `peer` of `>=0.14.x` would imply that we're compatible with future React releases, something we can't promise.

## Tasks

Run `$ builder help` to see usage.

```
Usage:

  builder <action> <task(s)>

Actions:

  help, run, concurrent, envs

Flags: General

  --builderrc: Path to builder config file (default: `.builderrc`)

Tasks:

  npm:postinstall
    [builder-victory-component] cd lib || builder run build

  npm:preversion
    [builder-victory-component] builder run check

  npm:test
    [builder-victory-component] builder run test-frontend

  npm:version
    [builder-victory-component] builder run clean && builder run build

  build
    [builder-victory-component] builder run build-lib && builder run build-dist

  build-dist
    [builder-victory-component] builder run clean-dist && builder run build-dist-min && builder run build-dist-dev

  build-dist-dev
    [builder-victory-component] webpack --bail --config node_modules/builder-victory-component/config/webpack/webpack.config.dev.js --colors

  build-dist-min
    [builder-victory-component] webpack --bail --config node_modules/builder-victory-component/config/webpack/webpack.config.js --colors

  build-lib
    [builder-victory-component] builder run clean-lib && babel src -d lib --copy-files

  check
    [builder-victory-component] builder run lint && builder run npm:test

  check-ci
    [builder-victory-component] builder run lint && builder run test-ci

  check-cov
    [builder-victory-component] builder run lint && builder run test-cov

  check-dev
    [builder-victory-component] builder run lint && builder run test-dev

  clean
    [builder-victory-component] builder run clean-lib && builder run clean-dist

  clean-dist
    [builder-victory-component] rimraf dist

  clean-lib
    [builder-victory-component] rimraf lib

  dev
    [builder-victory-component] builder concurrent server-dev server-test

  docs-build-static
    [builder-victory-component] webpack --config node_modules/builder-victory-component/config/webpack/docs/webpack.config.static.js --progress

  docs-dev
    [builder-victory-component] webpack-dev-server --port 3000 --config node_modules/builder-victory-component/config/webpack/docs/webpack.config.dev.js --content-base docs

  docs-hot
    [builder-victory-component] webpack-dev-server --port 3000 --config node_modules/builder-victory-component/config/webpack/docs/webpack.config.hot.js --hot --content-base docs

  hot
    [builder-victory-component] builder concurrent server-hot server-test

  lint
    [builder-victory-component] builder concurrent lint-server lint-client lint-client-test

  lint-client
    [builder-victory-component] eslint --color --ext .js,.jsx -c node_modules/builder-victory-component/config/eslint/.eslintrc-client src demo/*.jsx

  lint-client-test
    [builder-victory-component] eslint --color --ext .js,.jsx -c node_modules/builder-victory-component/config/eslint/.eslintrc-client-test src test/client

  lint-server
    [builder-victory-component] eslint --color -c node_modules/builder-victory-component/config/eslint/.eslintrc-server *.js

  open-demo
    [builder-victory-component] opener http://127.0.0.1:3000

  open-dev
    [builder-victory-component] builder concurrent dev open-demo

  open-hot
    [builder-victory-component] builder concurrent hot open-demo

  push-gh-pages
    [builder-victory-component] git subtree push --prefix docs/build origin gh-pages

  server-dev
    [builder-victory-component] webpack-dev-server --port 3000 --config node_modules/builder-victory-component/config/webpack/demo/webpack.config.dev.js --colors --content-base demo

  server-docs
    [builder-victory-component] http-server docs/build

  server-hot
    [builder-victory-component] webpack-dev-server --port 3000 --config node_modules/builder-victory-component/config/webpack/demo/webpack.config.hot.js --colors --inline --hot --content-base demo

  server-test
    [builder-victory-component] webpack-dev-server --port 3001 --config node_modules/builder-victory-component/config/webpack/webpack.config.test.js --colors

  test-ci
    [builder-victory-component] builder run test-frontend-ci

  test-cov
    [builder-victory-component] builder run test-frontend-cov

  test-dev
    [builder-victory-component] builder run test-frontend-dev

  test-frontend
    [builder-victory-component] karma start node_modules/builder-victory-component/config/karma/karma.conf.js

  test-frontend-ci
    [builder-victory-component] karma start --browsers PhantomJS,Firefox node_modules/builder-victory-component/config/karma/karma.conf.coverage.js

  test-frontend-cov
    [builder-victory-component] karma start node_modules/builder-victory-component/config/karma/karma.conf.coverage.js

  test-frontend-dev
    [builder-victory-component] karma start node_modules/builder-victory-component/config/karma/karma.conf.dev.js
```

[archetype templates]: ./init
[http://babeljs.io/docs/usage/options/]: http://babeljs.io/docs/usage/options/
[builder]: https://github.com/FormidableLabs/builder
[builder-init]: https://github.com/FormidableLabs/builder-init
[development guide]: ./dev/DEVELOPMENT.md
[victory-chart]: https://github.com/FormidableLabs/victory-chart
[trav_img]: https://api.travis-ci.org/FormidableLabs/builder-victory-component.svg
[trav_site]: https://travis-ci.org/FormidableLabs/builder-victory-component
