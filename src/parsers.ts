import type { QsConfig, QsStyle, QsStyleProps } from './custom';

export const prefixPropName = (name: string, qsStyle: QsStyle): string => {
  if (qsStyle.prefix) {
    return (
      qsStyle.prefix.replace(/\s/g, '') +
      name.charAt(0).toUpperCase() +
      name.slice(1)
    );
  }
  return name;
};

export const parseQsStyleProps = (data: {
  qsStyleKey: string;
  qsStyle: QsStyle;
  compProps: Record<string, any>;
}) => {
  const { qsStyleKey, qsStyle, compProps } = data;

  if (!qsStyle.hasOwnProperty('props') || typeof qsStyle.props !== 'object') {
    console.warn(
      `QuickStyle: 'props' object must be provided on style: ${qsStyleKey} `
    );
    return {};
  }

  let style: Record<string, any> = {};

  const qsPropsKeys: string[] = [];

  const propsKeys = Object.keys(qsStyle.props);
  propsKeys.forEach((propKey) => {
    const qsPropName = propKey as keyof QsStyleProps;
    const qsPropNameWithPrefix = prefixPropName(propKey, qsStyle);
    qsPropsKeys.push(qsPropNameWithPrefix);
    const qsPropValue = qsStyle.props[qsPropName];

    const compPropValue = compProps[qsPropNameWithPrefix];

    if (compPropValue !== undefined) {
      let styleName: undefined | string;
      if (typeof qsPropValue === 'string') styleName = qsPropValue as string;
      else if (typeof qsPropValue === 'function') {
        const result = qsPropValue(compPropValue);
        if (typeof result === 'string') styleName = result;
        if (typeof result === 'object' && !Array.isArray(result)) {
          style = { ...style, ...result };
        }
      }

      if (styleName) {
        style[styleName] = compPropValue;
      }
    }
  });

  return { style, qsPropsKeys: qsPropsKeys };
};

export const parseQsConfig = (data: {
  config: QsConfig;
  compProps: Record<string, any>;
}) => {
  const {
    config: { styles = {}, options = {} },
    compProps = {},
  } = data;

  const parsed: Record<string, any> = {};
  const qsStylesKeys = Object.keys(styles);
  const qsPropsKeys: string[] = [];

  qsStylesKeys.forEach((qsKey) => {
    const qsStyle = styles[qsKey];

    const compStyleProp = compProps[qsKey] ?? {};

    if (qsStyle) {
      const stripQsProps =
        qsStyle.stripQsProps ?? options.stripQsProps ?? false;

      const { style, qsPropsKeys: propsKeys = [] } = parseQsStyleProps({
        qsStyleKey: qsKey,
        qsStyle,
        compProps,
      });

      if (stripQsProps) qsPropsKeys.push(...propsKeys);

      const { overrideStyleProps = options.overrideStyleProps ?? true } =
        qsStyle;
      if (overrideStyleProps) {
        parsed[qsKey] = { ...compStyleProp, ...style };
      } else parsed[qsKey] = { ...style, ...compStyleProp };
    }
  });

  Object.keys(compProps).forEach((key) => {
    if (!qsStylesKeys.includes(key)) {
      if (!qsPropsKeys.includes(key)) {
        parsed[key] = compProps[key];
      }
    }
  });

  return parsed;
};
