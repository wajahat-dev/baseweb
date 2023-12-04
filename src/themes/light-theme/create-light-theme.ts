/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import animation from '../shared/animation';
import borders from '../shared/borders';
import breakpoints from '../shared/breakpoints';
import deepMerge from '../../utils/deep-merge';
import { getFoundationColorTokenOverrides } from '../utils';
import defaultFoundationColorTokens from './color-tokens';
import { colors as primitiveColorTokens } from '../../tokens';
import getComponentColorTokens from './color-component-tokens';
import getSemanticColorTokens from './color-semantic-tokens';
import typography from '../shared/typography';
import grid from '../shared/grid';
import lighting from '../shared/lighting';
import mediaQuery from '../shared/media-query';
import sizing from '../shared/sizing';

import type { Theme, MakeExtendable, DeepPartial } from '../../styles/types';

export default function createLightTheme<
  OverridesT extends DeepPartial<MakeExtendable<Theme>> = {}
>(overrides?: OverridesT): Theme & OverridesT {
  const foundationColorTokens = {
    ...defaultFoundationColorTokens,
    ...getFoundationColorTokenOverrides(overrides?.colors),
  };
  const semanticColorTokens = getSemanticColorTokens(foundationColorTokens);
  const componentColorTokens = getComponentColorTokens(foundationColorTokens);

  const theme = {
    animation,
    borders,
    breakpoints,
    colors: {
      ...primitiveColorTokens,
      ...foundationColorTokens,
      ...semanticColorTokens,
      ...componentColorTokens,
    },
    direction: 'auto',
    grid,
    lighting,
    mediaQuery,
    sizing,
    typography,
    // TODO(#2318) Remove in v11, the next major version.
    // Do not use.
    zIndex: {
      modal: 2000,
    },
  };

  return deepMerge(theme, overrides);
}
