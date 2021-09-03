import { useEffect, useRef } from 'react';

// If the anchor has no height and is just a "marker" in the dom; we'll use the parent (normally the link text) rect boundaries instead
function getVisibleBoundingClientRect(element: HTMLElement): DOMRect {
  const rect = element.getBoundingClientRect();
  const hasNoHeight = rect.top === rect.bottom;
  if (hasNoHeight) {
    return getVisibleBoundingClientRect(element.parentNode as HTMLElement);
  }
  return rect;
}

function isInViewportTopHalf(boundingRect: DOMRect) {
  return boundingRect.top > 0 && boundingRect.bottom < window.innerHeight / 2;
}

function getAnchors() {
  // For toc highlighting, we only consider h2/h3/h4 anchors
  const selector = '.anchor.anchor__h2, .anchor.anchor__h3, .anchor.anchor__h4';
  return Array.from(document.querySelectorAll(selector)) as HTMLElement[];
}

function getActiveAnchor({ anchorTopOffset }: { anchorTopOffset: number }) {
  const anchors = getAnchors();

  // Note: it does not mean this anchor is visible yet, but if user continues scrolling down, it will be the first to become visible
  const nextVisibleAnchor = anchors.find(anchor => {
    const boundingRect = getVisibleBoundingClientRect(anchor);
    return boundingRect.top >= anchorTopOffset;
  });

  if (nextVisibleAnchor) {
    const boundingRect = getVisibleBoundingClientRect(nextVisibleAnchor);
    if (isInViewportTopHalf(boundingRect)) {
      return nextVisibleAnchor;
    } else {
      return anchors[anchors.indexOf(nextVisibleAnchor) - 1] ?? null;
    }
  } else {
    return anchors[anchors.length - 1];
  }
}

function getLinkAnchorValue(link: HTMLAnchorElement): string {
  return decodeURIComponent(link.href.substring(link.href.indexOf('#') + 1));
}

function getLinks(linkClassName: string) {
  return Array.from(document.getElementsByClassName(linkClassName)) as HTMLAnchorElement[];
}

function useTOCHighlight({
  linkClassName,
  linkActiveClassName,
  anchorTopOffset,
}: {
  linkClassName: string;
  linkActiveClassName: string;
  anchorTopOffset: number;
}) {
  const lastActiveLinkRef = useRef<HTMLAnchorElement | undefined>(undefined);

  useEffect(() => {
    function updateLinkActiveClass(link: HTMLAnchorElement, active: boolean) {
      if (active) {
        if (lastActiveLinkRef.current && lastActiveLinkRef.current !== link) {
          lastActiveLinkRef.current?.classList.remove(linkActiveClassName);
        }
        link.classList.add(linkActiveClassName);
        lastActiveLinkRef.current = link;
      } else {
        link.classList.remove(linkActiveClassName);
      }
    }

    function updateActiveLink() {
      const links = getLinks(linkClassName);
      const activeAnchor = getActiveAnchor({
        anchorTopOffset,
      });
      const activeLink = links.find(
        link => activeAnchor && activeAnchor.id === getLinkAnchorValue(link)
      );

      links.forEach(link => {
        updateLinkActiveClass(link, link === activeLink);
      });
    }

    document.addEventListener('scroll', updateActiveLink);
    document.addEventListener('resize', updateActiveLink);

    updateActiveLink();

    return () => {
      document.removeEventListener('scroll', updateActiveLink);
      document.removeEventListener('resize', updateActiveLink);
    };
  }, []);
}

export default useTOCHighlight;
