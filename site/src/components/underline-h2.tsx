import styled from '@emotion/styled';

const UnderlineH2 = styled.h2`
  font-size: var(--fontSize-4);
  letter-spacing: 0.3px;
  display: inline-block;
  position: relative;
  margin-bottom: var(--spacing-12);

  &::after {
    content: '';
    position: absolute;
    bottom: -24px;
    left: 0;
    width: 100%;
    height: 4px;
    border-radius: 99999px;
    background: #ffd53d;
    transform: rotate(-1deg);
  }
`;

export default UnderlineH2;
