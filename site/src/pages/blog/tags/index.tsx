import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../../components/layout';
import Seo from '../../../components/seo';
import ExploreTags from '../../../components/explore-tags';

const TagIndex = ({ data }) => {
  const tags = data.allTag.nodes.map(item => item.name);

  if (tags.length === 0) {
    return (
      <Layout full={false}>
        <Seo title="All tags" />
        <p>No Tags found. Add tags filed to post's frontmatter.</p>
      </Layout>
    );
  }

  return (
    <Layout full={false}>
      <Seo title="All posts" />
      <ExploreTags />
    </Layout>
  );
};

export default TagIndex;

export const pageQuery = graphql`
  query {
    allTag {
      nodes {
        name
        id
      }
    }
  }
`;
