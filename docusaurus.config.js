const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "集散地",
  tagline: "没有固定主题，一些零散的东西",
  url: "https://yuzhouu.github.io",
  baseUrl: "/yuzhouu/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "yuzhouu", // Usually your GitHub org/user name.
  projectName: "yuzhouu", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "集散地",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "doc",
          docId: "index",
          position: "left",
          label: "Dive into React",
        },
        { to: "/chart", label: "Chart", position: "left" },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/yuzhouu",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} YuZhou.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "react",
          routeBasePath: "react",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/yuzhouu/yuzhouu/edit/master/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/yuzhouu/yuzhouu/edit/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "chart",
        path: "chart",
        routeBasePath: "chart",
        sidebarPath: require.resolve("./sidebars.js"),
        editUrl: "https://github.com/yuzhouu/yuzhouu/edit/master/",
      },
    ],
  ],
};
