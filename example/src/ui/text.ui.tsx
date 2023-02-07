import * as React from 'react';
import { Text } from 'react-native';
import { qs, withQuickStyle } from '@yet3/react-native-quick-style';
import type { QsProps } from 'src/custom';
import { QsPresets } from './qsPresets';

const qsConfig = qs(
  {
    style: {
      props: {
        ...QsPresets.margin,
        ...QsPresets.padding,
        ...QsPresets.text,
        ...QsPresets.bg,
        ...QsPresets.border,
      },
    },
  },
  { overrideStyleProps: true }
);

interface Props extends QsProps<typeof qsConfig> {
  content?: string;
}

export const UiText = withQuickStyle(({ style, content }: Props) => {
  return <Text style={style}>{content}</Text>;
}, qsConfig);
