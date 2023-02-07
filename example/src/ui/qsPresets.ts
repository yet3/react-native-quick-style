import { LooseStringCmp, makeQsPresets } from '@yet3/react-native-quick-style';

const MARGIN = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  xl_2: 16,
};
const MARGIN_KEYS = Object.keys(MARGIN);
type MarginParserArg = LooseStringCmp<keyof typeof MARGIN> | number;

const parseMargin = (value: MarginParserArg) => {
  let result = 0;
  if (typeof value === 'number') result = value;
  else if (MARGIN_KEYS.includes(value as string)) {
    result = MARGIN[value as keyof typeof MARGIN];
  } else {
    const parsed = parseFloat(value as string);
    if (!isNaN(parsed)) result = parsed;
  }
  return result;
};

const PADDING = {
  sm: 2,
  md: 4,
  lg: 8,
  xl: 12,
};
const PADDING_KEYS = Object.keys(PADDING);
type PaddingParserArg = LooseStringCmp<keyof typeof MARGIN> | number;

const parsePadding = (value: PaddingParserArg) => {
  let result = 0;
  if (typeof value === 'number') result = value;
  else if (PADDING_KEYS.includes(value as string)) {
    result = PADDING[value as keyof typeof PADDING];
  } else {
    const parsed = parseFloat(value as string);
    if (!isNaN(parsed)) result = parsed;
  }
  return result;
};

export const QsPresets = makeQsPresets({
  bg: {
    bgColor: 'backgroundColor',
  },
  border: {
    border: (values: [number, string]) => {
      return {
        borderWidth: values[0],
        borderColor: values[1],
      };
    },
  },
  dim: {
    width: 'width',
    height: 'height',
  },
  text: {
    color: 'color',
    size: 'fontSize',
    weight: 'fontWeight',
    font: 'fontFamily',
    align: 'textAlign',
  },
  margin: {
    m: (v: MarginParserArg) => ({ margin: parseMargin(v) }),
    mx: (v: MarginParserArg) => ({ marginHorizontal: parseMargin(v) }),
    my: (v: MarginParserArg) => ({ marginVertical: parseMargin(v) }),
    mt: (v: MarginParserArg) => ({ marginTop: parseMargin(v) }),
    mb: (v: MarginParserArg) => ({ marginBottom: parseMargin(v) }),
    mr: (v: MarginParserArg) => ({ marginRight: parseMargin(v) }),
    ml: (v: MarginParserArg) => ({ marginLeft: parseMargin(v) }),
  },
  padding: {
    p: (v: PaddingParserArg) => ({ padding: parsePadding(v) }),
    px: (v: PaddingParserArg) => ({ paddingHorizontal: parsePadding(v) }),
    py: (v: PaddingParserArg) => ({ paddingVertical: parsePadding(v) }),
    pt: (v: PaddingParserArg) => ({ paddingTop: parsePadding(v) }),
    pb: (v: PaddingParserArg) => ({ paddingBottom: parsePadding(v) }),
    pr: (v: PaddingParserArg) => ({ paddingRight: parsePadding(v) }),
    pl: (v: PaddingParserArg) => ({ paddingLeft: parsePadding(v) }),
  },
  flex: {
    flex: 'flex',
    shrink: 'flexShrink',
    grow: 'flexGrow',
    direction: 'flexDirection',
    justifyContent: 'justifyContent',
    alignItems: 'alignItems',
    alignSelf: 'alignSelf',
  },
  rounded: {
    rounded: 'borderRadius',
  },
});
