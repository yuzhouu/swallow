---
title: 使用说明
tags: [doc]
date: 2021-11-16
---

## 项目愿景

使会基础 git 操作和 markdown 语法的人，

## 目录结构

```
｜- data
｜- ｜ - blog // 博客内容
｜- ｜- images // 博客中使用到的图片资源
｜- google-tracking-id // 你的google UA id
｜- meta.json // 网站元数据
｜- site // 用于blog生成的源码，非深度定制化不需要改动这里
```

## meta.json

```json5
{
  site: {
    // 网站名称
    title: "Ordinary Days",

    // 网站的url
    siteUrl: "https://yuzhou.github.io/ordinary-days",

    // 用于rss 和 网站seo的描述
    description: "Blog模版，github action自动生成blog，无需了解前端知识",

    // github 用户名/仓库名
    githubRepo: "yuzhouu/ordinary-days",

    // 网站底部链接 name用于匹配图标
    footerLinks: [
      {
        name: "github",
        link: "https://github.com/yuzhouu/ordinary-days",
      },
      {
        name: "rss",
        link: "/rss.xml",
      },
    ],
  },

  // 作者相关信息
  author: {
    // 作者名称
    name: "YuZhou",
    // 作者主页链接
    link: "https://github.com/yuzhouu",
  },

  // GitHub pages 前缀
  // - 例如你的仓库名称为xx，则pathPrefix 必须为 xx;
  // - 其他特殊情况：若你的仓库名为xx.github.io, pathPrefix 为 /
  pathPrefix: "ordinary-days",
}
```

## 接入 google 统计

在`data/`目录下添加 google-tracking-id 文件，写入你的 UA
例子

```bash
# data/google-tracking-id
UA-XXXXXXX-X
```

### UA 的获取

google ua 可以去https://analytics.google.com/analytics/web申请，通过`设置>创建媒体资源>显示高级选项>创建 Universal Analytics 媒体资源`，可以获得 google UA。

注意 ⚠️ga4 的 id 无法使用，请保证 id 的格式为 UA-XXXXXX-XX

## 如何写 blog

文章会自动通过`data/blog`下的 markdown 生成，文件路径自动映射到网站 url， 例如`hello.md` 会自动映射到 `yourdomain.com/blog/hello`。

同时注意每一篇 blog 都需要 frontmatter 信息
例子

```
---
title: 使用说明
tags: [doc]
date: 2021-11-16
---

你的markdown正文
```

## 接入 blog 评论

评论功能由 utterances 提供

> A lightweight comments widget built on GitHub issues. Use GitHub issues for blog comments, wiki pages and more!

utterances 会将对应的 issue 同步到网站的评论区。你需要到一下网址https://utteranc.es/，给utterances授予你的blog repo 的访问权限，同时注意正确填写了/data/meta.json 中的`githubRepo`字段。
