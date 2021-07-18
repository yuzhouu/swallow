import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "Dive into React",
    slug: "react",
    Svg: require("../../static/img/undraw_docusaurus_react.svg").default,
    description: <>深入React源码，分析内部逻辑</>,
  },
  {
    title: "Dive into Chart",
    slug: "chart",
    Svg: require("../../static/img/undraw_docusaurus_mountain.svg").default,
    description: <>前端图表架构相关</>,
  },
  {
    title: "Blog",
    slug: "blog",
    Svg: require("../../static/img/undraw_docusaurus_tree.svg").default,
    description: <>一些零散的文章</>,
  },
];

function Feature({ Svg, title, description, slug }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Link to={slug}>
          <h3>{title}</h3>
        </Link>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
