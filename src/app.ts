#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { Log } from './libs/log.js'
import { INsp, TCmdOpt, TDefineOpts } from './typing.js'
import { exec } from 'child_process'
import { parseArgs } from './libs/tool.js'
import presets from './preset.js'
import { defineNSPConfig } from './cli.js'
import prettier from 'prettier'
import inquirer from 'inquirer'
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

// 有效的配置文件
const ValidUserConfigFile = 'nsp.config.mjs'

class Nsp implements INsp {
  allScripts: TCmdOpt[]
  appName: string
  constructor() {
    this.allScripts = []
  }

  async init() {
    const { command, args } = parseArgs(process.argv)
    if (command && command === 'init') {
      this.genConfigByUserPkg()
      return
    }
    const config = await this.parseUserConfig()
    this.merge(config)

    const binKey = Object.keys(pkg.bin)[0]

    this.appName = binKey

    if (command) {
      const valid = this.validCmd(command)
      if (!valid) {
        Log.error('命令无效')
        this.printHelp()
      } else {
        this.executeScript(valid.script)
      }
    } else {
      this.printHelp()
    }
  }

  async merge(userConfig: TDefineOpts) {
    const { scripts, extends: ext = [] } = userConfig
    this.allScripts = [...scripts, ...ext] as unknown as TCmdOpt[]

    // 简单的校验一下配置
    this.allScripts.forEach((item) => {
      if (!item.cmd && item.script) {
        Log.error(`${item.script}命令配置错误`)
        process.exit(0)
      }
      if (item.cmd && !item.script) {
        Log.error(`${item.cmd}命令配置错误`)
        process.exit(0)
      }
      if (!item.cmd && !item.script) {
        Log.error(`${JSON.stringify(item)}命令配置错误`)
        process.exit(0)
      }
    })

    return this.allScripts
  }

  validCmd(cmd: string) {
    return this.allScripts.find((item) => item.cmd === cmd)
  }

  async parseUserConfig() {
    try {
      const userConfigFile = path.resolve(ValidUserConfigFile)
      if (!this.exitConfig()) {
        throw '配置文件不存在'
      }
      const Conf = await import(userConfigFile)
      return Conf.default
    } catch (error) {
      Log.error(error)
    }

    return undefined
  }

  printHelp() {
    const indent = ' '.repeat(2)
    if (this.allScripts.length == 0) {
      Log.warn('没有有效的命令配置')
      return
    }

    // 最长的命令
    const maxCmdLength = Math.max(...this.allScripts.map((el) => el.cmd.length))

    Log.help(`当前项目支持的命令，请通过一下方式执行： \n`)

    this.allScripts.forEach((item) => {
      const needSpace = maxCmdLength - item.cmd.length
      const space = ' '.repeat(needSpace + 4)
      Log.help(`${indent} $ ${this.appName} ${item.cmd}${space}${item.desc}`)
    })

    Log.help(`\n提示：如果需要补充脚本，请通过 ${ValidUserConfigFile} 进行配置`)
  }

  executeScript(cmd: string) {
    exec(cmd, (err, _sto) => {
      if (err) {
        Log.error(err.stack)
      } else {
        // Log.info(sto)
      }
    })
  }

  exitConfig() {
    const userConfigFile = path.resolve(ValidUserConfigFile)
    const isExit = existsSync(userConfigFile)
    return isExit
  }

  genConfigByUserPkg() {
    if (this.exitConfig()) {
      inquirer
        .prompt([
          {
            type: 'confirm',
            message: '配置已存在，是否替换',
            name: 'replace',
          },
        ])
        .then((answers: any) => {
          const { replace } = answers
          if (replace) {
            this.writeTemplate(true)
          } else {
            process.exit(0)
          }
        })
        .catch((error: { stack: string }) => {
          Log.error(error.stack)
        })
    } else {
      this.writeTemplate()
    }
  }

  writeTemplate(isReplace?: boolean) {
    const userPKG = JSON.parse(readFileSync(path.resolve('package.json'), 'utf8'))

    const { scripts } = userPKG

    const userScripts = []

    for (const key in scripts) {
      userScripts.push({
        cmd: key,
        script: scripts[key],
        desc: '--',
      })
    }

    const template = `import { defineNSPConfig, presets } from 'npm-scripts-proxy'
    export default defineNSPConfig({
      scripts: ${JSON.stringify(userScripts)},
    })`

    try {
      const content = prettier.format(template, { semi: false, parser: 'babel' })
      writeFileSync(ValidUserConfigFile, content)
      isReplace && Log.success('配置已生成，请继续补充必要信息哦~')
    } catch (error) {
      Log.error(error.stack)
    }
  }
}

const ins = new Nsp()
ins.init()

export { presets, defineNSPConfig }
