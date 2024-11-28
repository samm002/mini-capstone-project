const sanitizeString = (inputString) => {
  return inputString
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-/g, '');
};

module.exports = sanitizeString;
