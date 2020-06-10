const methodSlug = (methodName) => {
  return methodName.toLowerCase().split(' ').join('-');
};

module.exports = methodSlug;
