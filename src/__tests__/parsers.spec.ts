import type { QsStyle } from 'src/custom';
import { qs } from '..';
import { parseQsConfig, parseQsStyleProps, prefixPropName } from '../parsers';

describe('parsers', () => {
  describe('prefixPropName()', () => {
    it('should return passed value', () => {
      const result = prefixPropName('mt', {
        props: {},
      });

      expect(result).toBe('mt');
    });

    it('should return prefixed value', () => {
      const result = prefixPropName('mt', {
        props: {},
        prefix: 'box',
      });

      expect(result).toBe('boxMt');
    });

    describe('when prefix includes spaces', () => {
      it('should return prefixed value', () => {
        const result = prefixPropName('mt', {
          props: {},
          prefix: '  b ox   ',
        });

        expect(result).toBe('boxMt');
      });
    });
  });

  describe('parseQsStyleProps()', () => {
    const compProps = {
      bgColor: 'red',
      py: 14,
      mt: undefined,
      testProp: 99,
    };
    const qsStyle: QsStyle = {
      props: {
        mt: 'marginBottom',
        size: 'fontSize',
        bgColor: 'backgroundColor',
        py: 'paddingVertical',
      },
    };

    it('should parse props', () => {
      const { style, qsPropsKeys } = parseQsStyleProps({
        qsStyleKey: 'style',
        compProps,
        qsStyle,
      });

      expect(compProps).toEqual({
        bgColor: 'red',
        py: 14,
        mt: undefined,
        testProp: 99,
      });
      expect(qsPropsKeys).toMatchObject(Object.keys(qsStyle.props));
      expect(style).toEqual({
        backgroundColor: 'red',
        paddingVertical: 14,
      });
    });

    it('should parse props and strip qs props', () => {
      const { style, qsPropsKeys } = parseQsStyleProps({
        qsStyleKey: 'style',
        compProps,
        qsStyle,
      });

      expect(compProps).toEqual({
        bgColor: 'red',
        py: 14,
        mt: undefined,
        testProp: 99,
      });
      expect(qsPropsKeys).toMatchObject(Object.keys(qsStyle.props));
      expect(style).toEqual({
        backgroundColor: 'red',
        paddingVertical: 14,
      });
    });

    describe('with parser props', () => {
      it('should parse props', () => {
        const { style, qsPropsKeys } = parseQsStyleProps({
          qsStyleKey: 'style',
          compProps: {
            mt: 99,
            mb: '15',
            size: 'md',
          },
          qsStyle: {
            props: {
              mt: (val: number) => 'marginTop',
              mb: (val: number | string) => ({ marginBottom: val }),
              size: (val: 'sm' | 'md') => ({
                width: val == 'sm' ? 50 : 100,
                height: val == 'sm' ? 25 : 50,
              }),
            },
          },
        });

        expect(qsPropsKeys).toMatchObject(['mt', 'mb', 'size']);
        expect(style).toEqual({
          marginTop: 99,
          marginBottom: '15',
          width: 100,
          height: 50,
        });
      });
    });
  });

  describe('parseQsConfig()', () => {
    const qsConfig = qs({
      style: {
        props: {
          mt: 'marginTop',
          mb: 'marginBottom',
          pt: 'paddingTop',
          pb: 'paddingBottom',
        },
      },
    });

    describe('when overrideStyleProps = true || undefined', () => {
      const comProps = {
        mt: 12,
        mb: 16,
        pt: 8,
        pb: 8,
        style: {
          marginTop: 8,
          paddingBottom: 16,
          backgroundColor: 'blue',
        },
      };
      const expectedResult = {
        mt: 12,
        mb: 16,
        pt: 8,
        pb: 8,
        style: {
          marginTop: 12,
          marginBottom: 16,
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: 'blue',
        },
      };

      it('should override style prop', () => {
        const parsed = parseQsConfig({
          compProps: comProps,
          config: { ...qsConfig, options: { overrideStyleProps: true } },
        });

        expect(parsed).toEqual(expectedResult);
      });

      it('should override style prop', () => {
        const parsed = parseQsConfig({
          compProps: comProps,
          config: { ...qsConfig, options: {} },
        });

        expect(parsed).toEqual(expectedResult);
      });
    });

    describe('when overrideStyleProps = false', () => {
      it("shouldn't override style prop", () => {
        const parsed = parseQsConfig({
          compProps: {
            mt: 12,
            mb: 16,
            pt: 8,
            pb: 8,
            style: {
              marginTop: 8,
              paddingBottom: 16,
              backgroundColor: 'blue',
            },
          },
          config: { ...qsConfig, options: { overrideStyleProps: false } },
        });

        expect(parsed).toEqual({
          mt: 12,
          mb: 16,
          pt: 8,
          pb: 8,
          style: {
            marginTop: 8,
            marginBottom: 16,
            paddingTop: 8,
            paddingBottom: 16,
            backgroundColor: 'blue',
          },
        });
      });
    });
  });
});
