import { Link } from 'gatsby';
import styled from '@emotion/styled';

const Nav = styled.ul`
  margin: var(--spacing-12) var(--spacing-0) var(--spacing-0);
  padding: var(--spacing-0);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;

  li {
    list-style: none;

    &:last-of-type {
      text-align: right;
    }

    a {
      color: var(--color-text-light);
      display: block;
      border-radius: 3px;
      border: 1px solid var(--color-border);
      padding: var(--spacing-2) var(--spacing-5);
      text-decoration: none;
      font-size: var(--fontSize-0);
      transition: 0.3s ease border-color, 0.2s ease color;

      &:hover {
        color: var(--color-primary);
        border-color: var(--color-primary);
      }
    }
  }
`;

const PostTitle = styled.div`
  font-weight: var(--fontWeight-semibold);
  font-size: var(--fontSize-1);
  color: var(--color-primary);
`;

type NavType = {
  slug: string;
  frontmatter: {
    title: string;
  };
};

type PostNavProps = {
  postNav: {
    newer: NavType | null;
    older: NavType | null;
  };
};

const PostNav = ({ postNav }: PostNavProps) => {
  return (
    <Nav>
      <li>
        {postNav.newer && (
          <Link to={'/blog/' + postNav.newer.slug} rel="prev">
            <div>上一篇</div>
            <PostTitle>« {postNav.newer.frontmatter.title}</PostTitle>
          </Link>
        )}
      </li>
      <li>
        {postNav.older && (
          <Link to={'/blog/' + postNav.older.slug} rel="next">
            <div>下一篇</div>
            <PostTitle>{postNav.older.frontmatter.title} »</PostTitle>
          </Link>
        )}
      </li>
    </Nav>
  );
};

export default PostNav;
