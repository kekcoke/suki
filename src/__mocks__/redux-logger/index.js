const logger = jest.fn(() => (next) => (action) => next(action));

module.exports = {
  __esModule: true,
  default: logger,
};
