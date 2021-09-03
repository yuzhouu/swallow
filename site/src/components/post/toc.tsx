import styled from '@emotion/styled';
import { Link } from 'gatsby';

const TOCList = styled.ul<{ isChild?: boolean }>`
  margin: var(--spacing-0);
  padding: var(--spacing-2);

  padding-left: ${props => (props.isChild ? 'var(--spacing-4)' : 'var(--spacing-2)')};
`;

export interface TOCHeading {
  url: string;
  title: string;
  items?: TOCHeading[];
}

interface TOCProps {
  toc: TOCHeading[];
  isChild?: boolean;
}

const TOCHeadings = ({ toc, isChild = false }: TOCProps) => {
  if (!toc || !toc.length) {
    return null;
  }

  return (
    <TOCList isChild={isChild}>
      {toc.map(heading => {
        return (
          <li key={heading.url}>
            <Link to={heading.url}>{heading.title}</Link>

            <TOCHeadings isChild={true} toc={heading.items} />
          </li>
        );
      })}
    </TOCList>
  );
};

const TOC = ({ toc }: { toc: TOCHeading[] }) => {
  return (
    <div>
      <TOCHeadings toc={toc} />
    </div>
  );
};

export default TOC;
