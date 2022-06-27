# 南京邮电大学比赛管理系统前端

## 前置准备

#### 环境

- Node >= 16 (低于 16 版本会有不可预知问题,运行项目前应先升级 node 版本)
- Yarn >= 1 <2 (本项目依赖安装暂时仅支持 yarn, 注意不要使用 yarn2.x)
- VSCode（使用前请安装 Eslint 和 Prettier - Code formatter 扩展）

#### 需要掌握的技能

- React 的基本语法, 主要的 hooks
- Ts 基础知识，如基本的变量声明、泛型
- sass 基础知识
- 数据管理 Recoil 的基本使用
- 发送网络请求 axios 的基本使用

## 代码提交

#### commit

本项目中 `git commit`命令会被拦截，应使用 `yarn commit`进行提交。在根目录执行 `yarn commit`根据提示信息填写便可，同时该命令内置了 `git add .`命令，因此执行前不再需要手动执行 `git add .`（执行一遍也不会出错）。

#### push

同样 `git push`命令也会被拦截，需要使用 `yarn push`命令进行代码提交。会在提交代码前将开发分支与远程 master 分支进行合并，保证代码是最新的。

## 代码结构

```
src/
├── api         // 用于存放request请求函数
│   ├── index.ts      // 一般在/api/index.ts或request.ts中写拦截器和BaseURL等内容，便于管理
│   │         // 建议将token等信息统一在拦截器中插入，避免产生冗余代码
│   └── example2.ts      // 其他文件中需从index.ts中import引入BaseURL等全局配置，便于统一管理
├── util        // 用于存放工具函数的文件夹
│   ├── example1.ts      // 例如时间格式化等函数在项目中可能多次复用，应当写在util文件夹中的代码中并export
│   └── example2.ts
├── components       // 用于存放公共组件代码，一般存可复用组件
│   ├── ExampleComponent1    // 组件代码通常以文件夹形式出现，组件名即`组件相关文件(夹)名都应当首字母大写，并以驼峰命名法命名
│   │   ├── index.tsx  // 组件代码文件
│   │   ├── index.scss  // 组件样式
│   │   └── ChildComponent    // 在必要时，可以设置子组件，但是子组件应当只可由文件夹对应的其父组件使用
│   │       ├── index.tsx
│   │       └── index.scss
│   └── ExampleComponent2
│       ├── index.tsx
│       └── index.scss
├── routes        // 用于存放路由相关代码
│   ├── example1.ts
│   └── example2.ts
├── test        // 用于存放测试代码
│   ├── example1.ts
│   └── example2.ts
├── store        // 用于存放存储相关代码，例如Recoil的atom代码应该存放在此并export
│   ├── example1.ts
│   └── example2.ts
├── assets        // 用于存放资源文件，例如图片、字体、数据等
│   ├── example1.jpg
│   ├── example1.png
│   └── example2.svg
├── type       // 用于存放ts中类型定义
│   ├── example1.ts
│   └── example2.ts
└── pages        // 用于存放页面
    ├── example1
    │   ├── index.tsx
    │   └── index.scss
    └── example2
        ├── index.tsx
        ├── index.scss
        └── components    // 在必要时，可以设置页面的子组件，但是页面的子组件应当只可由其对应父级页面使用
            ├── Component1.tsx
            └── Component2.tsx
```
