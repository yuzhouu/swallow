---
title: create portal
tags: [react source, code]
date: 2021-08-30
---

## how to create portal?

```js
/**
 * @file react-dom
 */
import {createPortal as createPortalImpl} from 'react-reconciler/src/ReactPortal';
...
function createPortal(
  children: ReactNodeList,
  container: Container,
  key: ?string = null
): React$Portal {
  invariant(
    isValidContainer(container),
    "Target container is not a DOM element."
  );
  // TODO: pass ReactDOM portal implementation as third argument
  // $FlowFixMe The Flow type is opaque but there's no way to actually create it.
  return createPortalImpl(children, container, null, key);
}
```

```js
/**
 * @file react-reconciler/src/ReactPortal
 */
export function createPortal(
  children: ReactNodeList,
  containerInfo: any,
  // TODO: figure out the API for cross-renderer implementation.
  implementation: any,
  key: ?string = null
): ReactPortal {
  return {
    // This tag allow us to uniquely identify this as a React Portal
    $$typeof: REACT_PORTAL_TYPE,
    key: key == null ? null : "" + key,
    children,
    containerInfo,
    implementation,
  };
}
```

## how to create fiber from portal object?

```js
/**
 * @file packages/react-reconciler/src/ReactChildFiber.new.js
 */
export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);

function ChildReconciler(shouldTrackSideEffects) {
    // a lot of methods
    // ...
    function reconcileSinglePortal {...}

    function reconcileChildFibers {...}

    return reconcileChildFibers;
}
```

```js
/**
 * @function reconcileChildFibers
 */
function reconcileChildFibers(
    returnFiber: Fiber,
    currentFirstChild: Fiber | null,
    newChild: any,
    lanes: Lanes,
  ): Fiber | null {
    // ...
    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        // ...
        case REACT_PORTAL_TYPE:
          return placeSingleChild(
            reconcileSinglePortal(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes,
            ),
          );
        // ...
      }
     // ...
  }
```

```js
function reconcileSinglePortal(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  portal: ReactPortal,
  lanes: Lanes
): Fiber {
  const key = portal.key;
  let child = currentFirstChild;
  while (child !== null) {
    // TODO: If key === null and child.key === null, then this only applies to
    // the first item in the list.
    if (child.key === key) {
      if (
        child.tag === HostPortal &&
        child.stateNode.containerInfo === portal.containerInfo &&
        child.stateNode.implementation === portal.implementation
      ) {
        deleteRemainingChildren(returnFiber, child.sibling);
        const existing = useFiber(child, portal.children || []);
        existing.return = returnFiber;
        return existing;
      } else {
        deleteRemainingChildren(returnFiber, child);
        break;
      }
    } else {
      deleteChild(returnFiber, child);
    }
    child = child.sibling;
  }

  const created = createFiberFromPortal(portal, returnFiber.mode, lanes);
  created.return = returnFiber;
  return created;
}
```
