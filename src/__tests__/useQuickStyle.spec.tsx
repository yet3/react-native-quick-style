import { qs, qsPrefix, useQuickStyle } from '../index';

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

describe('useQuickStyle()', () => {
  it("shouldn't strip qs props", () => {
    const result = useQuickStyle(
      { ...qsConfig, options: { stripQsProps: false } },
      {
        mt: 12,
        mb: 6,
        p: 32,
        isBig: true,
        textP: 2,
        textMb: 4,
        textColor: 'red',
        textSize: 'lg',
      }
    );

    expect(result).toEqual({
      isBig: true,
      mb: 6,
      mt: 12,
      p: 32,
      style: {
        marginBottom: 6,
        marginTop: 12,
        padding: 24,
      },
      textColor: 'red',
      textMb: 4,
      textP: 2,
      textSize: 'lg',
      textStyle: {
        color: 'red',
        fontSize: 18,
        marginBottom: 4,
        padding: 2,
      },
    });
  });

  it('should strip qs props', () => {
    const result = useQuickStyle(
      {
        ...qsConfig,
        options: { stripQsProps: true },
      },
      {
        mt: 12,
        mb: 6,
        p: 32,
        isBig: true,
        textP: 2,
        textMb: 4,
        textColor: 'red',
        textSize: 'lg',
      }
    );

    expect(result).toEqual({
      style: {
        marginBottom: 6,
        marginTop: 12,
        padding: 24,
      },
      textStyle: {
        color: 'red',
        fontSize: 18,
        marginBottom: 4,
        padding: 2,
      },
    });
  });

  it("shouldn't modify passed props object", () => {
    const compProps = {
      mt: 12,
      mb: 6,
      p: 32,
      isBig: true,
      textP: 2,
      textMb: 4,
      textColor: 'red',
      textSize: 'lg',
    };
    const result = useQuickStyle(
      {
        ...qsConfig,
        options: { stripQsProps: true },
      },
      compProps
    );

    expect(compProps).toEqual({
      mt: 12,
      mb: 6,
      p: 32,
      isBig: true,
      textP: 2,
      textMb: 4,
      textColor: 'red',
      textSize: 'lg',
    });
    expect(result).toEqual({
      style: {
        marginBottom: 6,
        marginTop: 12,
        padding: 24,
      },
      textStyle: {
        color: 'red',
        fontSize: 18,
        marginBottom: 4,
        padding: 2,
      },
    });
  });
});
