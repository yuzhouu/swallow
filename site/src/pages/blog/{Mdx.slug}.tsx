import * as React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Bio from '../../components/bio';
import PostLayout from '../../components/post/post-layout';
import Seo from '../../components/seo';
import PostNav from '../../components/post/blog-post-nav';
import PostTags from '../../components/post/post-tags';

const BlogPostTemplate = ({ data }) => {
  const post = data.mdx;

  return (
    <PostLayout>
      <Seo title={post.frontmatter.title} description={post.excerpt} />
      <article className="blog-post" itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <div>{post.frontmatter.date}</div>
          <Bio />
        </header>
        <MDXRenderer itemProp="articleBody">{post.body}</MDXRenderer>
        <hr />
        <footer>
          <PostTags tags={post.frontmatter.tags} />
        </footer>
      </article>
      <PostNav postNav={post.postNav} />
    </PostLayout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
      postNav {
        newer {
          slug
          frontmatter {
            title
          }
        }
        older {
          slug
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
