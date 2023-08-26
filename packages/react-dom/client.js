/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use strict';

import type {ReactNodeList} from 'shared/ReactTypes';
import type {
  RootType,
  HydrateRootOptions,
  CreateRootOptions,
} from './src/client/ReactDOMRoot';

import {
  createRoot as createRootImpl,
  hydrateRoot as hydrateRootImpl,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED as Internals,
} from './';


// 3가지를 나눈 이유가 있을 것이다.
// Element : 가장 일반적인 Document를 상속 받은 Element [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element)
// Document : 
// DocumentFragment : 
export function createRoot(
  container: Element | Document | DocumentFragment,
  options?: CreateRootOptions,
): RootType {
  if (__DEV__) {
    Internals.usingClientEntryPoint = true;
  }
  try {
    return createRootImpl(container, options);
  } finally {
    if (__DEV__) {
      Internals.usingClientEntryPoint = false;
    }
  }
}

export function hydrateRoot(
  container: Document | Element,
  children: ReactNodeList,
  options?: HydrateRootOptions,
): RootType {
  if (__DEV__) {
    Internals.usingClientEntryPoint = true;
  }
  try {
    return hydrateRootImpl(container, children, options);
  } finally {
    if (__DEV__) {
      Internals.usingClientEntryPoint = false;
    }
  }
}
