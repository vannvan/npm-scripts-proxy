# npm-scripts-proxy
>
> 让npm-scripts的体验更好

![](https://badgen.net/npm/dm/npm-scripts-proxy)
![](https://badgen.net/npm/v/npm-scripts-proxy)
![](https://badgen.net/npm/node/next)  

简体中文｜[English](README.md)

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
