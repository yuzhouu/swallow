import { memo } from 'react';
import slugify from 'slugify';

export const H2 = memo(props => {
  return (
    <h2
      className="anchor anchor__h2"
      {...props}
      id={slugify(props.children as string, { remove: /[.\\]+/g, lower: true })}
    />
  );
});

export const H3 = memo(props => {
  return (
    <h3
      className="anchor anchor__h3"
      {...props}
      id={slugify(props.children as string, { remove: /[.\\]+/g, lower: true })}
    />
  );
});

export const H4 = memo(props => {
  return (
    <h4
      className="anchor anchor__h4"
      {...props}
      id={slugify(props.children as string, { remove: /[.\\]+/g, lower: true })}
    />
  );
});
