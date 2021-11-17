---
title: 高级设置
tags: [doc]
date: 2021-11-17
---

## 接入 google 统计

在`data/`目录下添加 google-tracking-id 文件，写入你的 UA

例子

```bash
# data/google-tracking-id
UA-XXXXXXX-X
```

### UA 的获取

ua 可以去https://analytics.google.com/analytics/web申请，通过`设置>创建媒体资源>显示高级选项>创建 Universal Analytics 媒体资源`，可以获得 UA。

注意 ⚠️ga4 的 id 无法使用，请保证 id 的格式为 UA-XXXXXX-XX

## 接入 blog 评论

评论功能由 utterances 提供，utterances 会将对应的 issue 同步到网站的评论区。

> A lightweight comments widget built on GitHub issues. Use GitHub issues for blog comments, wiki pages and more!

设置步骤如下

1. 正确填写了`/data/meta.json` 中的`githubRepo`字段，格式为你的 `github用户名/仓库名称`
2. 将`/data/meta.json` 中的`enableComment`字段设置为 `true`
3. 到 https://utteranc.es/ 根据 utterances 的文档，给 utterances 授予你的 blog repo 的访问权限
