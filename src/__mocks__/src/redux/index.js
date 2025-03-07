const mockStore = {
  getState: jest.fn(() => ({})),
  dispatch: jest.fn(),
  subscribe: jest.fn(() => jest.fn()),
  replaceReducer: jest.fn(),
};

const mockPersistor = {
  purge: jest.fn(() => Promise.resolve()),
  flush: jest.fn(() => Promise.resolve()),
  pause: jest.fn(),
  persist: jest.fn(),
  getState: jest.fn(() => ({ bootstrapped: true })),
};

const middlewares = [
  jest.fn(() => (next) => (action) => next(action)), // thunk mock
  jest.fn(() => (next) => (action) => next(action)), // saga mock
  jest.fn(() => (next) => (action) => next(action)), // logger mock
];

module.exports = {
  __esModule: true,
  store: mockStore,
  persistor: mockPersistor,
  middlewares,
  default: mockStore,
};
