import { Link } from 'gatsby';
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

const PostList = ({ posts }: Props) => {
  return (
    <ol style={{ listStyle: `none` }}>
      {posts.map(post => {
        const title = post.frontmatter.title || post.slug;

        return (
          <li key={post.slug}>
            <article className="post-list-item" itemScope itemType="http://schema.org/Article">
              <header>
                <h2>
                  <Link to={`/blog/${post.slug}`} itemProp="url">
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
              <footer>
                <PostTags tags={post.frontmatter.tags} />
              </footer>
            </article>
          </li>
        );
      })}
    </ol>
  );
};

export default PostList;
