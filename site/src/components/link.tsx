import clsx from 'clsx';
import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby';
import React from 'react';

function normalizeRelativeLink(link: string) {
  if (link.endsWith('/')) return link;

  return link + '/';
}

const Link = (props: GatsbyLinkProps<any>) => {
  const { ref, activeClassName, activeStyle, ...rest } = props;

  // fix gatsby ssr not consistent
  const getProps = ({ href, location, isPartiallyCurrent }) => {
    if (isPartiallyCurrent) {
      return {
        'aria-current': 'page',
        style: {
          ...props.style,
          ...props.activeStyle,
        },
        className: clsx([props.className, props.activeClassName]),
      };
    }

    // case is current
    if (normalizeRelativeLink(location.pathname) === normalizeRelativeLink(href)) {
      return {
        'aria-current': 'page',
        style: {
          ...props.style,
          ...props.activeStyle,
        },
        className: clsx([props.className, props.activeClassName]),
      };
    }
    return {};
  };

  return <GatsbyLink {...rest} getProps={getProps} />;
};

export default Link;
