# npm-scripts-proxy

> Let npm-scripts have a better experience

![](https://badgen.net/npm/dm/npm-scripts-proxy)
![](https://badgen.net/npm/v/npm-scripts-proxy)
![](https://badgen.net/npm/node/next)

English | [简体中文](README.zh-CN.md)

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
