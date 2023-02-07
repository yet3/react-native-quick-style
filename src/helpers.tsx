import type { QsOptions, QsPreset, QsPresets, QsStyles } from './custom';

export const qs = <TStyles extends QsStyles>(
  config: TStyles,
  options: QsOptions = {}
) => {
  return { styles: config, options };
};

export const qsPrefix = <TPrefix extends string>(prefix: TPrefix) => {
  return prefix;
};

export const makeQsPresets = <TPresets extends QsPresets>(
  presetes: TPresets
) => {
  return presetes;
};

export const makeQsPreset = <TPreset extends QsPreset>(presete: TPreset) => {
  return presete;
};
