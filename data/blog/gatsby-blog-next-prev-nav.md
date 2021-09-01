---
title: gatsby 博客 上一篇/下一篇 翻页的实现
tags: [gatsby]
date: 2021-09-01
---

![nav](../images/nav.png)

[gatsby-starer-blog](https://github.com/gatsbyjs/gatsby-starter-blog/blob/master/gatsby-node.js)的官方例子中提供了通过`createPages` api 的实现方式，但是这种方式与`File System Route`不兼容。本文通过 `createResolver` 实现了可以与其兼容的上下翻页导航

## 正文

话不说，上代码

```javascript
// gatsby.node.js
const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type PostNav {
      newer: Mdx
      older: Mdx
    }
  `;
  createTypes(typeDefs);
};

exports.createSchemaCustomization = createSchemaCustomization;

const createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Mdx: {
      postNav: {
        type: `PostNav`,
        resolve: (source, args, context, info) => {
          const postList = context.nodeModel
            .getAllNodes({ type: `Mdx` })
            .sort((a, b) => {
              return (
                new Date(b.frontmatter.date).valueOf() -
                new Date(a.frontmatter.date).valueOf()
              );
            });
          let index = 0;

          for (let i = 0; i < postList.length; i++) {
            if (postList[i].id === source.id) {
              index = i;
              break;
            }
          }

          return {
            newer: postList[index - 1] || null,
            older: postList[index + 1] || null,
          };
        },
      },
    },
  };

  createResolvers(resolvers);
};

exports.createResolvers = createResolvers;
```

## 参考链接

- https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createResolvers
