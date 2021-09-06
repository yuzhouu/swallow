import React, { useEffect } from 'react';

export default ({
  repo,
  issueTerm = 'pathname',
  label = 'comment',
  theme = 'github-light',
  crossorigin = 'anonymous',
  async = true,
}) => {
  const rootElm = React.createRef<HTMLDivElement>();

  useEffect(() => {
    // Ensure script is loaded with the correct params by removing cached element
    while (rootElm.current.firstChild) {
      rootElm.current.removeChild(rootElm.current.firstChild);
    }

    const utterances = document.createElement('script');

    // set config to of script element
    Object.entries({
      src: 'https://utteranc.es/client.js',
      repo,
      'issue-term': issueTerm,
      label,
      theme,
      crossorigin,
      async,
    }).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });
    // attach script element
    rootElm.current.appendChild(utterances);
  }, []);

  return <div id="utterances_container" ref={rootElm} />;
};
