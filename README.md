# OverWatchTeams-React-Native-Expo

## 开源地址

[GitHub](https://github.com/zxj963577494/OverWatchTeams-React-Native-Expo)

[Gitee](https://gitee.com/zhengxujiang/OverWatchTeams-React-Redux-Native)

## 项目地址

### Andorid 版

![android.png](https://i.loli.net/2017/12/30/5a47184bb539c.png)

[Android](https://fir.im/yg3w)

### Expo 版(需 Expo 移动端([Android](https://play.google.com/store/apps/details?id=host.exp.exponent)/[iOS](https://itunes.com/apps/exponent)))

![expo.png](https://i.loli.net/2017/12/30/5a47184bb1438.png)

[Expo](https://exp.host/@linq/OverWatchTeams)

## 简介

项目基于[Expo](https://expo.io/)的 React Native 构建技术。

Expo 是一个围绕 React Native 构建的免费开源工具链，可帮助您使用 JavaScript 和 React 构建本地 iOS 和 Android 项目

[Expo 文档](https://docs.expo.io/versions/latest/index.html)

## 技术栈

* Expo
* React-Native
* React-Navigation
* Redux
* Redux-Saga
* LeanCloud
* Antd-Mobile

## 项目结构

![screenshot_22.png](https://i.loli.net/2017/12/30/5a471b6bc4ea1.png)

## 准备工具

1. 获取 Expo 构建桌面客户端(XDE)

* [macOS](https://xde-updates.exponentjs.com/download/mac)

* [Windows64-bit](https://xde-updates.exponentjs.com/download/win32)

* [Linux](https://xde-updates.exponentjs.com/download/linux-x86_64)

2. 获取 Expo 预览 iOS 或 Android 客户端

* [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

![google.png](https://i.loli.net/2017/12/30/5a47184bb7ee3.png)

* [iOS](https://itunes.com/apps/exponent)

![appstore.png](https://i.loli.net/2017/12/30/5a47184bb675c.png)

3. [参考资料](https://docs.expo.io/versions/latest/introduction/installation.html)

## 使用方式

1. git clone https://github.com/zxj963577494/OverWatchTeams-React-Native-Expo.git

2. 打开桌面客户端(XDE)加载本项目，启动本项目，点击 Share 获取二维码

3. 打开 iOS 或 Android 客户端，扫描 XDE 客户端二维码

4. [参考资料](https://docs.expo.io/versions/latest/introduction/xde-tour.html)

## 项目生成

1. yarn global add exp

2. exp build:ios / build:android

3. exp build:status

4. [参考资料](https://docs.expo.io/versions/latest/guides/exp-cli.html)

## 项目发布

1. yarn global add exp

2. exp publish

## 一些说明

`exp build:ios/build:android`生成的是 JS Bundle 文件，Expo 会将该文件上传到 Expo 云端，由 Expo 构建 APP，使用`exp build:status`可以得到 APP 在云端构建的进度，构建完成后，会返回 APP 地址

使用 `exp build:ios` 时必须有$99 的开发者账户(我没有，所以没构建 iOS 版本)，如果 apple id 开启了两步验证，需要加`--local-auth`

`exp publish`用于发布 JS Bundle 文件，更改 app.json 文件的版本号，icon 之类，用户下载的 App 会自动同步发布时版本所改动的内容，类似于 CodePush 热更新。[参考资料 1](https://docs.expo.io/versions/latest/guides/publishing.html) [参考资料 2](https://docs.expo.io/versions/latest/guides/offline-support.html)

Expo 无法像原生 React Native 一样，可以对本地模块进行操作，当然`react-native link` 命令也是无法使用的，但你可以使用 Expo 开放的操作本地功能的 API，[SDK API 参考](https://docs.expo.io/versions/latest/sdk/index.html)

## 开源协议

[GPL-2.0](./LICENSE)
