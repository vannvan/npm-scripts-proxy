/**
 * 框架平台
 */
export type TPlatform = 'vue' | 'react'

/**
 * 构建工具
 */
export type TBuildTool = 'vite' | 'webpack' | 'umi'

export type TCmdOpt = {
  /**
   * 指令
   */
  cmd: string
  /**
   * 要执行的脚本
   */
  script: string

  /**
   * 描述
   */
  desc: string
}

export type TDefineOpts = {
  /**
   * 脚本配置
   */
  scripts: TCmdOpt[]
  /**
   * 构建工具
   */
  buildTool?: TBuildTool
  /**
   * 扩展
   */
  extends?: TCmdOpt[]
}

export interface INsp {
  init: () => void
  /**
   * 合并配置
   * @param config
   * @returns
   */
  merge: (config: TDefineOpts) => Promise<TCmdOpt[]>
  /**
   * 解析用户配置
   * @returns
   */
  parseUserConfig: () => Promise<TDefineOpts | undefined>
  /**
   * 执行脚本
   * @param script
   * @returns
   */
  executeScript: (script: string) => void
  /**
   * 根据已有scripts生成配置
   * @returns
   */
  genConfigByUserPkg: () => void
  /**
   * 验证命令是否存在
   * @param cmd
   * @returns
   */
  validCmd: (cmd: string) => TCmdOpt
  /**
   * 写入模版
   * @param isReplace
   * @returns
   */
  writeTemplate: (isReplace?: boolean) => void
}
