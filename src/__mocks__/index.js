const mockStore = {
  getState: jest.fn(() => ({})),
  dispatch: jest.fn(),
  subscribe: jest.fn(() => jest.fn()),
};

const mockPersistor = {
  purge: jest.fn(() => Promise.resolve()),
  flush: jest.fn(() => Promise.resolve()),
  pause: jest.fn(),
  persist: jest.fn(),
};

export const store = mockStore;
export const persistor = mockPersistor;
export const middlewares = [];
export default mockStore;
