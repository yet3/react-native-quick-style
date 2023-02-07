import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export type LooseStringCmp<T extends string> = T | Omit<string, T>;
export type LooseNumberCmp<T extends number> = T | Omit<number, T>;

type Style = ViewStyle & TextStyle & ImageStyle;
type StyleKeys = keyof Style;

export type QsStyleProps = {
  [key: string]: StyleKeys | ((value: any) => Style | StyleKeys);
};

export type QsPreset = QsStyleProps;
export type QsPresets = Record<string, QsPreset>;

export interface QsStyle {
  overrideStyleProps?: boolean;
  stripQsProps?: boolean;
  prefix?: string;
  props: QsStyleProps;
}

export interface QsStyles {
  [key: string]: QsStyle;
}

export interface QsOptions {
  stripQsProps?: boolean;
  overrideStyleProps?: boolean;

  DEBUG?: boolean;
}

export interface QsConfig {
  styles: QsStyles;
  options: QsOptions;
}

export type IntersectQsStyleProps<T> = T extends { [K in keyof T]: infer E }
  ? E extends Array<any>
    ? E[0]
    : E
  : never;

type QsStylePropToStyleKey<P> = P extends string
  ? P
  : P extends (v: any) => any
  ? keyof ReturnType<P>
  : never;

export type QsStylePropsKeys<P> = QsStylePropToStyleKey<
  IntersectQsStyleProps<P>
>;

export type QsStyleToStyles<TStyle extends object> = TStyle extends QsStyle
  ? TStyle['props'] extends QsStyleProps
    ? { [K in QsStylePropsKeys<TStyle['props']>]?: Style[K] }
    : never
  : never;

export type QsConfigToStyles<T> = T extends QsConfig
  ? {
      [K in keyof T['styles']]: QsStyleToStyles<T['styles'][K]> & Style;
    }
  : never;

type FlattenType<T> = T extends object
  ? { [K in keyof T]: (arg: T[K]) => void } extends Record<
      keyof T,
      (arg: infer A) => void
    >
    ? A
    : never
  : T;

type AddPrefix<T extends object> = {
  [K in keyof T]: T[K];
};

type QsCompPropKey<K extends string, T extends QsStyle> = T extends (
  p: string
) => p
  ? QsCompProps<Parameters<K>[0], T>
  : T['prefix'] extends string
  ? `${T['prefix']}${Capitalize<K>}`
  : K;

export type QsCompStyleProps<T extends object> = T extends QsStyle
  ? TStyle['props'] extends QsStyleProps
    ? {
        [K in keyof T['props'] as QsCompPropKey<
          K,
          T
        >]?: T['props'][K] extends string
          ? Style[T['props'][K]]
          : Parameters<T['props'][K]>[0];
      }
    : never
  : never;

export type QsCompProps<T extends QsConfig> = FlattenType<{
  [K in keyof T['styles']]: QsCompStyleProps<T['styles'][K]>;
}>;

export type QsProps<T> = QsConfigToStyles<T>;

export type UseQsProps<TConfig extends QsConfig = QsConfig> =
  QsCompProps<TConfig> & Record<string, any> & Partial<QsProps<TConfig>>;
