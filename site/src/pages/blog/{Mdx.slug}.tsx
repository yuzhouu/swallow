import * as React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from '@emotion/styled';

import Bio from '../../components/bio';
import Layout from '../../components/layout';
import Seo from '../../components/seo';
import PostNav from '../../components/post/blog-post-nav';
import PostTags from '../../components/post/post-tags';
import TOC from '../../components/post/toc';
import { MDXProvider } from '../../components/mdx/mdx-provider';

const Wrapper = styled.div`
  margin: var(--spacing-0) auto;
  padding: var(--spacing-10) var(--spacing-5);
  display: flex;
  justify-content: center;

  article {
    /** override implicit min-width */
    min-width: 0;
  }

  .blog-post {
    max-width: var(--maxWidth-post);
  }

  .toc-container {
    @media (max-width: 48rem) {
      display: none;
    }
    @media (min-width: 70.5rem) {
      width: 1px;
    }
  }
`;

const BlogPostTemplate = ({ data }) => {
  const post = data.mdx;

  return (
    <Layout>
      <Seo title={post.frontmatter.title} description={post.excerpt} />
      <Wrapper>
        <article className="blog-post" itemScope itemType="http://schema.org/Article">
          <header>
            <h1 itemProp="headline">{post.frontmatter.title}</h1>
            <div>{post.frontmatter.date}</div>
            <Bio />
          </header>
          <MDXProvider>
            <MDXRenderer itemProp="articleBody">{post.body}</MDXRenderer>
          </MDXProvider>
          <hr />
          <footer>
            <PostTags tags={post.frontmatter.tags} />
          </footer>

          <PostNav postNav={post.postNav} />
        </article>
        <div className="toc-container">
          <TOC toc={post.tableOfContents.items} />
        </div>
      </Wrapper>
    </Layout>
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
      tableOfContents
    }
  }
`;
