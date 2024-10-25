// actions/authActions.js
export const login = (user) => ({
  type: "LOGIN",
  payload: user, // user now contains both email and uid
});

export const logout = () => ({
  type: "LOGOUT",
});
