const thunk = (next) => (action) =>
  typeof action === "function"
    ? action(next.dispatch, next.getState)
    : next(action);

module.exports = {
  thunk,
};
