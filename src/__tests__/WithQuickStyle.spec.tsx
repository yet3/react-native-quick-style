import * as React from 'react';
import { Text, View } from 'react-native';
import { qs, qsPrefix, withQuickStyle } from '../index';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import type { QsProps } from 'src/custom';

configure({ adapter: new Adapter() });

const qsConfig = qs({
  style: {
    props: {
      mt: 'marginTop',
      mb: 'marginBottom',
      p: 'padding',
      isBig: (v: boolean) => ({ padding: v ? 24 : 12 }),
    },
  },
  textStyle: {
    overrideStyleProps: false,
    prefix: qsPrefix('text'),
    props: {
      p: 'padding',
      mb: 'marginBottom',
      color: 'color',
      size: (v: 'sm' | 'md' | 'lg') => ({
        fontSize: v === 'lg' ? 18 : v === 'md' ? 16 : 14,
      }),
    },
  },
});

type QsConfig = typeof qsConfig;

describe('withQuickStyle()', () => {
  it('should return component with parssed qs styles', () => {
    const TestComp = (props: QsProps<QsConfig>) => {
      return (
        <View style={props.style}>
          <Text style={props.textStyle}>Tak</Text>
        </View>
      );
    };
    const Comp = withQuickStyle(TestComp, qsConfig);
    const wrapper = shallow(<Comp mb={5} isBig />);
    expect(wrapper.props()).toEqual({
      isBig: true,
      mb: 5,
      style: {
        marginBottom: 5,
        padding: 24,
      },
      textStyle: {},
    });
  });
});
