import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { qs, withQuickStyle } from '@yet3/react-native-quick-style';
import type { QsProps } from 'src/custom';
import { QsPresets } from './qsPresets';

const qsConfig = qs({
  style: {
    props: {
      ...QsPresets.bg,
      ...QsPresets.dim,
      ...QsPresets.border,
      ...QsPresets.flex,
      ...QsPresets.margin,
      ...QsPresets.padding,
      ...QsPresets.rounded,
    },
  },
});

interface Props extends QsProps<typeof qsConfig> {
  children: React.ReactNode;
}

export const UiCard = withQuickStyle(({ style, children }: Props) => {
  return <View style={[styles.container, style]}>{children}</View>;
}, qsConfig);

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderColor: '#8a97a8',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
  },
});
