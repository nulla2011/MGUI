export const trimSpace = (input: string) => {
  return input.trim().replace(/ +|\t+/, ' ');
};
export const removeQuoteMarkPair = (input: string) => {
  if (
    (input.startsWith('"') && input.endsWith('"')) ||
    (input.startsWith("'") && input.endsWith("'"))
  ) {
    return removeQuoteMarkPair(input.slice(1, -1));
  } else {
    return input;
  }
};
