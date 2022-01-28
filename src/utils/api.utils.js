export const booleanToNumber = (value) => {
  if (typeof value === 'boolean') {
    return +value;
  }

  return undefined;
};

export const test = 123;
