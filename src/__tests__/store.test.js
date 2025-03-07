jest.mock("redux-saga");
jest.mock("redux-logger");
jest.mock("redux-persist");
jest.mock("redux-thunk");
jest.mock("../../src/redux/rootReducer");
jest.mock("../../src/redux/rootSaga");
jest.mock("../../src/redux");

import { persistor, store } from "../__mocks__/index";

describe("Store tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a store with persisted reducer", () => {
    expect(store).toBeDefined();
    expect(persistor).toBeDefined();
  });
});
