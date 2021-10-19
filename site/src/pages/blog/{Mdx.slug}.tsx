import * as React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from '@emotion/styled';

import PostLayout from '../../components/post/post-layout';
import Seo from '../../components/seo';
import PostNav from '../../components/post/blog-post-nav';
import PostTags from '../../components/post/post-tags';
import TOC from '../../components/post/toc';
import { MDXProvider } from '../../components/mdx/mdx-provider';
import PostComment from '../../components/post/post-comment';

const Wrapper = styled.div`
  margin: var(--spacing-0) auto;
  padding: var(--spacing-10) var(--spacing-5);
  display: flex;
  justify-content: center;

  header {
    text-align: center;
    padding: var(--spacing-8) 0 var(--spacing-12);

    .post-date {
      margin-bottom: var(--spacing-8);
    }

    h1 {
      margin-bottom: var(--spacing-10);
      font-size: var(--fontSize-6);
      line-height: var(--lineHeight-normal);
    }

    .post-tags {
      justify-content: space-around;
    }
  }

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
    <PostLayout>
      <Seo title={post.frontmatter.title} description={post.excerpt} />
      <Wrapper>
        <article className="blog-post" itemScope itemType="http://schema.org/Article">
          <header>
            <div className="post-date">{post.frontmatter.date}</div>
            <h1 itemProp="headline">{post.frontmatter.title}</h1>
            <PostTags className="post-tags" tags={post.frontmatter.tags} />
          </header>
          <MDXProvider>
            <MDXRenderer itemProp="articleBody">{post.body}</MDXRenderer>
          </MDXProvider>

          <PostNav postNav={post.postNav} />
        </article>
        <div className="toc-container">
          <TOC toc={post.tableOfContents.items} />
        </div>
      </Wrapper>
      <PostComment repo={data.site.siteMetadata.githubRepo} />
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
      tableOfContents
    }

    site {
      siteMetadata {
        githubRepo
      }
    }
  }
`;
