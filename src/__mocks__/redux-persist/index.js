const mockPersistor = {
  purge: jest.fn(() => Promise.resolve()),
  flush: jest.fn(() => Promise.resolve()),
  pause: jest.fn(),
  persist: jest.fn(),
  getState: jest.fn(() => ({ bootstrapped: true })),
};

const persistStore = jest.fn(() => mockPersistor);

const persistReducer = jest.fn(
  (config, reducer) => (state, action) => reducer(state, action)
);

module.exports = {
  persistStore,
  persistReducer,
};
