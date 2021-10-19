import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { memo } from 'react';
import slugify from 'slugify';
import clsx from 'clsx';

interface Props {
  tags: string[];
  className?: string;
}

const TagList = styled.ul`
  margin: var(--spacing-0);
  padding: var(--spacing-0);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: calc(-1 * var(--spacing-4));

  li {
    list-style: none;
    position: relative;
    margin-right: var(--spacing-2);
    margin-bottom: var(--spacing-4);

    a {
      display: inline-block;
      padding: var(--spacing-2) var(--spacing-4);
      border-radius: var(--spacing-2);
      text-decoration: none;
      background: var(--color-primary-light);
      color: var(--color-primary-dark);
      line-height: 1;

      &:hover {
        color: #fff;
        background: var(--color-primary);
        transition: background 125ms ease, color 125ms ease;
      }
    }
  }
`;

const PostTags = ({ tags, className = '' }: Props) => {
  if (!tags || tags.length === 0) {
    return null;
  }
  return (
    <div className={clsx('d-flex', className)}>
      <TagList>
        {tags
          .sort((a, b) => {
            return a.localeCompare(b);
          })
          .map(tag => {
            return (
              <li key={tag}>
                <Link to={`/blog/tags/${slugify(tag, { remove: /[.\\]+/g, lower: true })}`}>
                  {tag}
                </Link>
              </li>
            );
          })}
      </TagList>
    </div>
  );
};

export default memo(PostTags);
