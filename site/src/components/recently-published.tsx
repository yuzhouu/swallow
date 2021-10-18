import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import UnderlineH2 from './underline-h2';

const Wrapper = styled.div`
  position: relative;
  padding: var(--spacing-24) 0;
  max-width: 900px;

  .bg {
    position: absolute;
    left: 150px;
    right: 50px;
    height: 100%;
    background: #f8f8fc;
    z-index: -1;
    clip-path: polygon(0% 0%, 100% 5%, 100% 90%, 0% 95%);
  }
`;

const Posts = styled.div`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--spacing-10);
  padding: var(--fontSize-3) 0;

  a {
    display: block;
    text-decoration: none;
    border-radius: var(--spacing-2);
    padding: var(--spacing-6);
    box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 3%);
    background: #ffffff;

    h3 {
      margin: 0 0 var(--spacing-3);
      font-size: var(--fontSize-3);
    }

    .desc {
      color: var(--color-text-light);
    }

    small {
      color: #4a576c;
    }
  }

  .more {
    text-align: center;
    background: #352970;
    color: #ffffff;
    border-radius: var(--spacing-2);
    font-weight: var(--fontWeight-black);
    position: relative;
    padding: var(--spacing-8) var(--spacing-6);
    position: relative;
    overflow: hidden;

    .circle-1 {
      position: absolute;
      opacity: 0.075;
      width: 400px;
      left: -200px;
      top: 30px;
      transition: all 2s ease;

      circle {
        fill: #f0f1ff;
      }
    }
    .circle-2 {
      position: absolute;
      opacity: 0.075;
      width: 200px;
      right: -100px;
      bottom: 20px;
      transition: all 1.5s ease;
      circle {
        fill: #f0f1ff;
      }
    }

    &:hover {
      .circle-1 {
        transform: translate(40px, -50px);
      }
      .circle-2 {
        transform: translate(-30px, 10px);
      }
    }
  }
`;

const RecentlyPublished = () => {
  const { allMdx } = useStaticQuery(
    graphql`
      query {
        allMdx(limit: 5, sort: { fields: frontmatter___date, order: DESC }) {
          nodes {
            slug
            excerpt
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
    `
  );

  return (
    <Wrapper>
      <div className="bg"></div>
      <UnderlineH2>Recently Posts</UnderlineH2>
      <Posts>
        {allMdx.nodes.map(item => {
          return (
            <Link key={item.slug} to={`/blog/${item.slug}`}>
              <h3>{item.frontmatter.title}</h3>
              <p className="desc">{item.excerpt}</p>
              <small>{item.frontmatter.date}</small>
            </Link>
          );
        })}
        <Link to="/blog" className="more">
          <svg className="circle-1" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="100" />
          </svg>
          <svg className="circle-2" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="100" />
          </svg>
          <span>View all blog posts</span>
        </Link>
      </Posts>
    </Wrapper>
  );
};

export default RecentlyPublished;
