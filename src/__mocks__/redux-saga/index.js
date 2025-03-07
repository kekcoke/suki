const sagaMiddleware = {
  run: jest.fn(),
};

const createSagaMiddleware = jest.fn(() => sagaMiddleware);

module.exports = {
  __esModule: true,
  default: createSagaMiddleware,
  createSagaMiddleware,
};
