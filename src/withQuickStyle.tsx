import * as React from 'react';
import type { QsCompProps, QsConfig, QsProps } from './custom';
import { parseQsConfig } from './parsers';

export function withQuickStyle<
  TProps extends Record<string, any>,
  TConfig extends QsConfig
>(
  Component: React.ComponentType<
    TProps & QsProps<TConfig> & QsCompProps<TConfig>
  >,
  config: TConfig
) {
  return (
    props: Omit<TProps, keyof QsProps<TConfig>> &
      Partial<QsProps<TConfig>> &
      QsCompProps<TConfig>
  ) => {
    return (
      <Component {...(parseQsConfig({ config, compProps: props }) as any)} />
    );
  };
}
