# BossByRN

使用 react-native 模仿 boss 的 app

# 使用技术栈

- react-native
- typescript
- mobx 做状态管理

# 项目目录结构

```js
src/                  // - 这是存放所有应用程序逻辑的地方，通常包括以下子目录：
  assets/             // - 存放所有的静态资源，比如图片、字体文件等。
    fonts/            // - 字体资源。
    images/           // - 图片资源。
  common/             // - 常用工具类，例如请求封装，缓存封装等等
  components/         // - 公共的组件
  config/             // - 配置文件
  mobx-store/         // - 状态管理
  pages/              // - 所有页面的入口文件
  types/              // - typescript公共类型
App.tsx;              // - 应用程序入口点文件。
```

# 如何开始

1. 安装 gem 依赖，根目录将会生成 vendor 目录，主要存放 gem 安装的依赖

```bash
bundle install
```

2. 安装 npm 依赖

```bash
# using npm
npm install

# OR using Yarn
yarn
```

3. 启动开发调试

```bash
# using npm
npm run start

# OR using Yarn
yarn start
```

4. 如何打包构建

```bash
# 如果是打包构建android
npm run android
# OR
yarn android

# 如果是打包构建ios
npm run ios
# OR
yarn ios
```
