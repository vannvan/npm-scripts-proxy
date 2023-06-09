# npm-scripts-proxy
>
> 让npm-scripts的体验更好

![](https://badgen.net/npm/dm/npm-scripts-proxy)
![](https://badgen.net/npm/v/npm-scripts-proxy)
![](https://badgen.net/npm/node/next)  

简体中文｜[English](README.md)

## 缘何？

如果你有这么多`npm-scripts`配置，或者你需要这些脚本的使用说明

```js
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

那么通过`npm-scripts-proxy`可以让它变得更好！

## 安装

> npm i npm-scripts-proxy

## 配置scripts

一开始有两种配置方式可以选择

### 1. 手动创建

在项目根目录创建`nsp.config.mjs`文件，参考如下配置：

```js
// nsp.config.mjs
import { defineNSPConfig, presets } from 'npm-scripts-proxy'

export default defineNSPConfig({
  scripts: [
    {
      cmd: 'test',
      script: 'echo "Error: no test specified"',
      desc: '测试程序',
    },
    {
      cmd: 'build:test',
      script: 'node build.js',
      desc: '打包测试环境',
    }
  ],
  extends: presets.vite,
})

```

### 2. 生成器
>
> nsp init

然后你会得到根据项目中已有`scripts`配置生成的如以上配置形态类似的一套模板，再去完善`dsec`配置即可。

## 执行命令

`xxx`的含义是你在配置中定义好的某个指令

> nsp xxx

### 获取提示
>
> nsp

你会得到以下形态的项目可用脚本信息  
![](https://p.ipic.vip/ora36l.jpg)

## 反馈意见

[issues](https://github.com/vannvan/npm-scripts-proxy/issues)

如果有获得帮助欢迎点个⭐️
