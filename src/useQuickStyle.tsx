import type { QsConfig, QsCompProps, QsProps } from './custom';
import { parseQsConfig } from './parsers';

export function useQuickStyle<TConfig extends QsConfig>(
  config: TConfig,
  props: Record<string, any>
) {
  return parseQsConfig({ config, compProps: props }) as Partial<
    QsProps<TConfig>
  > &
    QsCompProps<TConfig>;
}
