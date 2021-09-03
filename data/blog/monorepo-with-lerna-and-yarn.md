---
title: Monorepo with lerna and yarn
tags: [monorepo, lerna, yarn]
date: 2021-02-14
---

直接在 lerna.json 中声明 packages: [...]，lerna bootstrap 时会为每个 repo 单独装依赖，在使用 react 时就可能遇到[invalid hook call warning](https://reactjs.org/warnings/invalid-hook-call-warning.html)错误，原因排除错误的使用了 hooks，就只有使用了多个 react 包。
看了下堆栈，有两个 repo 使用了自己 node_modules 中的 react。

运行命令`lerna bootstrap --hoist`，lerna 报错`hoist is not supported with --npm-client=yarn, use yarn workspaces instead`, 同时给出了一个提示`A guide is available at https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/`。

照提示进行更改，在 lerna.json 中添加`"useWorkspaces": true`，同时将 packages 字段从 lerna.json 中移到 package.json 中的 [workspaces](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#workspaces) 字段，然后 lerna bootstrap，这里 yarn 全权接手了依赖安装，共同依赖全装在了根目录，问题解决。

修改前

```json
// lerna.json
{
  "version": "0.0.0",
  "npmClient": "yarn",
  "packages": [
    "packages/*",
    "site"
  ],
}

//package.sjon
{
  //...
}
```

修改后

```json
// lerna.json
{
  "version": "0.0.0",
  "npmClient": "yarn",
  "useWorkspaces": true
}

//package.sjon
{
  //...
  "workspaces": [
    "packages/*",
    "site"
  ],
}
```

## 其他

### webpack-node-externals

这里提一下，如果你有 package 使用了 webpack 打包，然后使用了**webpack-node-externals**排除 node_modules 中的第三方依赖，需要修改 webpack-node-externals 的设置`{ modulesFromFile: true }`。因为 webpack-node-externals 会遍历项目下的 node_modules 下的依赖名称，
作为排除依据，但是我们的部分依赖被安装到了项目的根目录，所以 webpack-node-externals 会失效。这里设置`modulesFromFile: true`告诉
webpack-node-externals 直接去 package.json 中找依赖名称。当然你也可以通过设置`moduleDir`，告诉 webpack-node-externals 去哪里找
安装的依赖包

## 参考

- https://reactjs.org/warnings/invalid-hook-call-warning.html
- https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/
