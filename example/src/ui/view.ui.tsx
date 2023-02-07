import * as React from 'react';
import { Text, View } from 'react-native';
import { qs, qsPrefix, withQuickStyle } from '@yet3/react-native-quick-style';
import type { QsProps } from 'src/custom';
import { QsPresets } from './qsPresets';
import { UiText } from './text.ui';

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
  textStyle: {
    prefix: qsPrefix('text'),
    props: {
      ...QsPresets.text,
      ...QsPresets.bg,
    },
  },
});

interface Props extends QsProps<typeof qsConfig> {
  children: React.ReactNode;

  gap?: number;
}

export const UiView = withQuickStyle(
  ({ style, textStyle, gap, children }: Props) => {
    if (gap) {
      const { flexDirection } = style;
      const kiddos: React.ReactNode[] = [];
      const isVertical = ['row', 'row-reverse'].includes(flexDirection ?? '');

      let i = 0;
      React.Children.forEach(children, (child) => {
        if (child != null) {
          if (i > 0) {
            kiddos.push(
              <View
                key={`separator-${i}`}
                style={{
                  width: isVertical ? gap : undefined,
                  height: isVertical ? undefined : gap,
                }}
              />
            );
          }

          if (React.isValidElement(child)) {
            if (child.type === UiText) {
              kiddos.push(
                React.cloneElement(child, {
                  style: { ...textStyle, ...child.props.style },
                  key: `child-${i}`,
                } as any)
              );
            } else
              kiddos.push(React.cloneElement(child, { key: `child-${i}` }));
          } else if (typeof child === 'string') {
            kiddos.push(
              <Text key={`child-${i}`} style={textStyle}>
                {child}
              </Text>
            );
          }
          i++;
        }
      });

      return <View style={style}>{kiddos}</View>;
    }

    return <View style={style}>{children}</View>;
  },
  qsConfig
);
