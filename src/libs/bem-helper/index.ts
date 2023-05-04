/**
 * This is slightly improved copy of react-bem-helper repository.
 * You can find documentation here: https://www.npmjs.com/package/react-bem-helper
 * This module has two differences:
 *   1. When second parameter is object with boolean values, it behaves in same manner.
 *   When values aren't boolean, it returns them as key_value pair modifiers.
 *   2. It converts numbers to strings automatically (except 0).
 * */

const isString: (string: any) => boolean = (string) => {
  return typeof string === 'string';
};

const isFunction: (func: any) => boolean = (func) => {
  return typeof func === 'function';
};

const isBoolean: (func: any) => boolean = (bool) => {
  return typeof bool === 'boolean';
};

const stringToArray: (string: string) => string[] = (string) => {
  return string
    .toString()
    .split(/\s+/g)
    .filter((c) => c.length !== 0);
};

const objectToArray: (object: { [key: string]: any }) => string[] = (
  object
) => {
  return Object.entries(object).reduce((array: string[], [key, value]) => {
    let predicate = value;

    if (isFunction(value)) {
      predicate = value();
    }

    if (isBoolean(predicate)) {
      return predicate ? array.concat(stringToArray(key)) : array;
    }

    const modifier = isString(value) ? `${key}_${value}` : key;

    return array.concat(stringToArray(modifier));
  }, []);
};

const listToArray: (
  list?: string | string[] | Record<string, string | boolean | undefined>
) => string[] = (list) => {
  if (typeof list === 'string' && !!list) {
    return stringToArray(list);
  }
  if (Array.isArray(list)) {
    return list.reduce((array: string[], string: string) => {
      return string ? array.concat(stringToArray(string)) : array;
    }, []);
  }
  if (typeof list === 'object' && !!list) {
    return objectToArray(list);
  }
  return [];
};

/* type TBemHelper = (
  options: string | { name: string; prefix: string }
) => TBemHelperReturn; */

type TBemHelper = {
  (options: string): TBemHelperReturn;
  (options: { name: string; prefix: string }): TBemHelperReturn;
};

type TBemHelperReturn = (
  element?: string,
  modifiers?: string | Record<string, string | boolean | undefined> | string[],
  mixes?: string | Record<string, string> | string[]
) => string;

export const bemHelper: TBemHelper = (
  options: string | { name: string; prefix: string }
): TBemHelperReturn => {
  const rootDefaults = {
    prefix: '',
    modifierDelimiter: '--',
  };

  // Copy options on top of defaults
  const { modifierDelimiter, prefix } = Object.assign(rootDefaults, options);

  const name = typeof options === 'string' ? options : options.name;

  const blockName = prefix + name;

  return (element, modifiers, mixes) => {
    const rootName = element ? `${blockName}__${element}` : blockName;
    return [rootName]
      .concat(
        listToArray(modifiers).map((modifier: string) => {
          return rootName + modifierDelimiter + modifier;
        })
      )
      .concat(listToArray(mixes))
      .join(' ')
      .trim();
  };
};
