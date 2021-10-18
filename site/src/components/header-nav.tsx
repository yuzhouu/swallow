import styled from '@emotion/styled';
import { useStaticQuery, graphql } from 'gatsby';
import Link from './link';

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

const Brand = styled(Link)`
  align-items: center;
  display: flex;
  font-weight: var(--fontWeight-black);
  height: 2rem;
  margin-right: 1rem;
  min-width: 0;
  text-decoration: none;
  color: var(--color-heading);
  letter-spacing: -0.02em;

  &:hover {
    text-decoration: none;
  }
`;

const _NavLink = styled(Link)`
  align-items: center;
  display: flex;
  height: 2rem;
  margin-right: 1rem;
  min-width: 0;
  text-decoration: none;
  color: var(--color-heading);
  font-weight: var(--fontWeight-medium);

  &:hover {
    color: var(--color-primary);
    text-decoration: none;
  }

  &.active {
    color: var(--color-primary);
  }
`;

const NavItems = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  min-width: 0;
`;

const NavLink = props => {
  return <_NavLink {...props} activeClassName="active"></_NavLink>;
};

const HeaderNav = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  return (
    <Wrapper className="container">
      <NavItems>
        <Brand to="/">{site.siteMetadata.title}</Brand>
        <NavLink to="/blog">Blog</NavLink>
      </NavItems>
    </Wrapper>
  );
};

export default HeaderNav;
