import styled from '@emotion/styled';
import { useStaticQuery, graphql } from 'gatsby';
import Link from './link';

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  padding: var(--spacing-0) var(--spacing-16);

  @media (max-width: 56rem) {
    padding: var(--spacing-0) var(--spacing-5);
  }
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
`;

const _NavLink = styled(Link)`
  align-items: center;
  display: flex;
  height: 2rem;
  margin-right: 1rem;
  min-width: 0;
  text-decoration: none;
  color: var(--color-heading);

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
    <Wrapper>
      <NavItems>
        <Brand to="/">{site.siteMetadata.title}</Brand>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/about">About me</NavLink>
      </NavItems>
    </Wrapper>
  );
};

export default HeaderNav;
