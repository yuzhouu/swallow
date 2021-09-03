import { MDXProvider as DefaultMDXProvider } from '@mdx-js/react';

import { H2, H3, H4 } from './header';

export function MDXProvider({ children }) {
  return (
    <DefaultMDXProvider components={{ h2: H2, h3: H3, h4: H4 }}>{children}</DefaultMDXProvider>
  );
}
