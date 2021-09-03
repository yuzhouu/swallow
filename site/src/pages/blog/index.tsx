import * as React from 'react';
import { graphql } from 'gatsby';

import Bio from '../../components/bio';
import Layout from '../../components/layout';
import Seo from '../../components/seo';
import PostList from '../../components/post/post-list';

const BlogIndex = ({ data }) => {
  const posts = data.allMdx.nodes;

  if (posts.length === 0) {
    return (
      <Layout full={false}>
        <Seo title="All posts" />
        <Bio />
        <p>No blog posts found. Add markdown posts to "data/blog".</p>
      </Layout>
    );
  }

  return (
    <Layout full={false}>
      <Seo title="All posts" />
      <Bio />
      <PostList posts={posts} />
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        slug
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          tags
        }
      }
    }
  }
`;
