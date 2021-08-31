import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../../components/bio';
import PostLayout from '../../components/post-layout';
import Seo from '../../components/seo';

const BlogIndex = ({ data }) => {
  const posts = data.allMdx.nodes;

  if (posts.length === 0) {
    return (
      <PostLayout>
        <Seo title="All posts" />
        <Bio />
        <p>No blog posts found. Add markdown posts to "data/blog".</p>
      </PostLayout>
    );
  }

  return (
    <PostLayout>
      <Seo title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.slug;

          return (
            <li key={post.slug}>
              <article className="post-list-item" itemScope itemType="http://schema.org/Article">
                <header>
                  <h2>
                    <Link to={post.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          );
        })}
      </ol>
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
        }
      }
    }
  }
`;
