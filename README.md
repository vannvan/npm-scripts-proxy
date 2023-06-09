# npm-scripts-proxy

> Let npm-scripts have a better experience

![](https://badgen.net/npm/dm/npm-scripts-proxy)
![](https://badgen.net/npm/v/npm-scripts-proxy)
![](https://badgen.net/npm/node/next)

English | [简体中文](README.zh-CN.md)

## Why?

If you have so many npm-scripts configuration，Or maybe you want to know what these scripts do

```json
"scripts": {
  "analyze": "cross-env ANALYZE=1 umi build",
  "start": "cross-env UMI_ENV=dev umi dev",
  "dev": "npm run start:dev",
  "start:dev": "cross-env REACT_APP_ENV=dev MOCK=none UMI_ENV=dev umi dev",
  "start:no-mock": "cross-env MOCK=none UMI_ENV=dev umi dev",
  "start:no-ui": "cross-env UMI_UI=none UMI_ENV=dev umi dev",
  "start:pre": "cross-env REACT_APP_ENV=pre UMI_ENV=pre umi dev",
  "start:test": "cross-env REACT_APP_ENV=test MOCK=none UMI_ENV=test umi dev",
  "start:lcic": "cross-env REACT_APP_ENV=dev MOCK=none UMI_ENV=lcic umi dev",
  "build:test": "cross-env UMI_ENV=test umi build",
  "build:pt": "cross-env UMI_ENV=pt umi build",
  "build:pre": "cross-env UMI_ENV=pre umi build",
  "build:prod": "cross-env UMI_ENV=prod umi build",
  "build:canary": "cross-env UMI_ENV=canary umi build",
  "build:hw": "cross-env UMI_ENV=hw umi build",
  "build:ms": "cross-env UMI_ENV=ms umi build",
  "deploy": "npm run site && npm run gh-pages",
  "gh-pages": "gh-pages -d dist",
  "i18n-remove": "pro i18n-remove --locale=zh-CN --write",
  "postinstall": "umi g tmp",
  "lint": "umi g tmp && npm run lint:js && npm run lint:style && npm run lint:prettier",
  "lint-staged": "lint-staged",
  "lint-staged:js": "eslint --ext .js,.jsx,.ts,.tsx ",
  "lint:fix": "eslint --fix --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src && npm run lint:style",
  "lint:js": "eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
  "lint:prettier": "prettier --check \"src/**/*\" --end-of-line auto",
  "lint:style": "stylelint --fix \"src/**/*.less\" --syntax less",
  "openapi": "umi openapi",
  "precommit": "",
  "prettier": "prettier -c --write \"src/**/*\"",
  "pretest": "node ./tests/beforeTest",
  "test": "umi test",
  "test:all": "node ./tests/run-tests.js",
  "test:component": "umi test ./src/components",
  "tsc": "tsc --noEmit",
  "prepare": "husky install"
},

```

Maybe by `npm-scripts-proxy` can become better maintenance！

## Install

> npm i npm-scripts-proxy

## Config scripts

There are two ways you can create a profile to begin with

### 1. Manually create

Create the `nsp.config.mjs` file in the project root directory, refer to the following configuration form

```js
// nsp.config.mjs
import { defineNSPConfig, presets } from 'npm-scripts-proxy'

export default defineNSPConfig({
  scripts: [
    {
      cmd: 'test',
      script: 'echo "Error: no test specified"',
      desc: 'test application',
    },
    {
      cmd: 'build:test',
      script: 'node build.js',
      desc: 'Package the test environment file',
    }
  ],
  extends: presets.vite,
})

```

### 2. Generate configuration file  
>
> nsp init

Then you will get a similar to the above configuration a set of templates

## Run the command

The meaning of `xxx` is the command supported in your project

> nsp xxx

## Get prompt
>
> nsp  

Then you will get all that can be used in the project script command prompt information

## Feedback

[issues](https://github.com/vannvan/npm-scripts-proxy/issues)

If you have to get help welcome point ⭐ ️
