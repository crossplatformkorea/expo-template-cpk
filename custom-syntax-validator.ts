module.exports = (message, key) => {
  if (key.includes('-')) {
    throw new SyntaxError('Key must use underscore(_) instead of hyphen(-)!');
  }
};
