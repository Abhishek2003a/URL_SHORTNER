const validateURL = (url) => {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "([\\da-z\\.-]+)\\.([a-z]{2,6})" + // domain
    "([\\/\\w \\.-]*)*" + // path
    "(\\?[;&a-zA-Z0-9%]*)?" + // query string
    "(\\#[-a-zA-Z0-9%]*)?" // fragment locator
  );
  return urlPattern.test(url);
};
module.exports = validateURL;