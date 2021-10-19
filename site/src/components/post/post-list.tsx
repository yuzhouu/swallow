import { Link } from 'gatsby';
import styled from '@emotion/styled';
import PostTags from './post-tags';

interface Props {
  posts: Array<{
    excerpt: string;
    slug: string;
    frontmatter: {
      date: string;
      title: string;
      tags: string[];
    };
  }>;
}

const Wrapper = styled.ol`
  position: relative;
  margin: 0;

  ol {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--spacing-10);
    padding: var(--spacing-24) 0;

    @media (max-width: 40rem) {
      grid-template-columns: 1fr;
    }

    @media (min-width: 96rem) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  li {
    list-style: none;
  }

  .bg {
    position: absolute;
    left: 15%;
    right: 10%;
    height: 100%;
    background: #f8f8fc;
    z-index: -1;
    clip-path: polygon(0% 0%, 100% 5%, 100% 90%, 0% 95%);
  }
`;

const Post = styled.article`
  text-decoration: none;
  border-radius: var(--spacing-2);
  padding: var(--spacing-6);
  box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 3%);
  background: #ffffff;

  header {
    small {
      display: block;
      color: #4a576c;
      margin-bottom: var(--spacing-2);
    }

    h2 {
      margin: 0 0 var(--spacing-3);
      font-size: var(--fontSize-3);
    }
  }

  section {
    color: var(--color-text-light);
  }

  footer {
    margin-top: var(--spacing-8);
  }
`;

const PostList = ({ posts }: Props) => {
  return (
    <Wrapper>
      <div className="bg"></div>
      <ol>
        {posts.map(post => {
          const title = post.frontmatter.title || post.slug;

          return (
            <li key={post.slug}>
              <Post className="post-list-item" itemScope itemType="http://schema.org/Article">
                <header>
                  <small>{post.frontmatter.date}</small>
                  <h2>
                    <Link to={`/blog/${post.slug}`} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
                <footer>
                  <PostTags tags={post.frontmatter.tags} />
                </footer>
              </Post>
            </li>
          );
        })}
      </ol>
    </Wrapper>
  );
};

export default PostList;
