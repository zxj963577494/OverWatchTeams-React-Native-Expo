
# OverWatchTeams-React-Native-Expo

## 技术栈

* Expo
* React-Native
* React-Navigation
* Redux
* Redux-Saga
* LeanCloud
* Antd-Mobile

## 项目地址

[Android]('')/iOS

[Expo](https://exp.host/@linq/OverWatchTeams)(可以使用Expo移动端扫描页面二维码体验)

## 简介

项目基于[Expo](https://expo.io/)的React Native构建技术。

Expo是一个围绕React Native构建的免费开源工具链，可帮助您使用JavaScript和React构建本地iOS和Android项目

[Expo文档](https://docs.expo.io/versions/latest/index.html)

## 准备工具

1. 获取Expo构建桌面客户端(XDE)

* [macOS](https://xde-updates.exponentjs.com/download/mac)

* [Windows64-bit](https://xde-updates.exponentjs.com/download/win32)

* [Linux](https://xde-updates.exponentjs.com/download/linux-x86_64)

2. 获取Expo预览iOS或Android客户端

* [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

* [iOS](https://itunes.com/apps/exponent)

3. [参考资料](https://docs.expo.io/versions/latest/introduction/installation.html)

## 使用方式

1. git clone https://github.com/zxj963577494/OverWatchTeams-React-Native-Expo.git

2. 打开桌面客户端(XDE)加载本项目，启动本项目，点击Share获取二维码

3. 打开iOS或Android客户端，扫描XDE客户端二维码

4. [参考资料](https://docs.expo.io/versions/latest/introduction/xde-tour.html)

## 发布项目

1. yarn global add exp

2. exp build:ios / build:android

3. exp build:status

4. [参考资料](https://docs.expo.io/versions/latest/guides/exp-cli.html)

## 一些说明

使用Expo，```build:ios/build:android```命令生成的是JS Bundle文件，Expo会将该文件上传到Expo云端，由Expo构建APP，使用```build:status```可以得到APP在云端构建的进度，构建完成后，会返回APP地址

使用build:ios时必须有$99的开发者账户(我没有，所以没构建iOS版本)，如果apple id开启了两步验证，需要加```--local-auth```

Expo无法像原生React Native一样，可以对本地模块进行操作，当然``` react-native link ``` 命令也是无法使用的，但你可以使用Expo开放的操作本地功能的API，[SDK API参考](https://docs.expo.io/versions/latest/sdk/index.html)

## 开源协议

[GPL-2.0](./LICENSE)