import * as React from 'react';
import { graphql, Link, PageProps } from 'gatsby';

import Bio from '../../../components/bio';
import PostLayout from '../../../components/post/post-layout';
import Seo from '../../../components/seo';
import PostList from '../../../components/post/post-list';

const BlogIndex = ({ data, params }: PageProps & { data: any }) => {
  const posts = data.allMdx.nodes;
  const curTag = params.name;

  if (posts.length === 0) {
    return (
      <PostLayout>
        <Seo title={`Posts tagged with ${curTag}`} />
        <Bio />
        <p>No blog posts tagged with {curTag} found. Add tag to post's tags frontmatter.</p>
      </PostLayout>
    );
  }

  return (
    <PostLayout>
      <Seo title={`Posts tagged with ${curTag}`} />
      <Bio />
      <section>
        <h3>
          {posts.length} posts tagged with 『{curTag}』
        </h3>
        <Link to="/blog/tags">View all tags</Link>
      </section>

      <PostList posts={posts} />
    </PostLayout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query PostsByTag($id: String!) {
    allMdx(
      filter: { frontmatter: { tags: { eq: $id } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
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
