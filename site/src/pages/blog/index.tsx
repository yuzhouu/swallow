import * as React from 'react';
import { graphql } from 'gatsby';

import PostLayout from '../../components/post/post-layout';
import Seo from '../../components/seo';
import PostListHero from '../../components/post/post-list-hero';
import PostList from '../../components/post/post-list';

const BlogIndex = ({ data }) => {
  const posts = data.allMdx.nodes;

  if (posts.length === 0) {
    return (
      <PostLayout>
        <Seo title="All posts" />
        <PostListHero />
        <p>No blog posts found. Add markdown posts to "data/blog".</p>
      </PostLayout>
    );
  }

  return (
    <PostLayout>
      <Seo title="All posts" />
      <PostListHero />
      <PostList posts={posts} />
    </PostLayout>
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
