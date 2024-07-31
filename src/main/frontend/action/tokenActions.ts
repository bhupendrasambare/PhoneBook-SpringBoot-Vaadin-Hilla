export const SET_TOKEN = 'SET_TOKEN';

interface SetTokenAction {
  type: typeof SET_TOKEN;
  payload: string;
}

export type TokenActionTypes = SetTokenAction;

export const setToken = (token: string): TokenActionTypes => ({
  type: SET_TOKEN,
  payload: token,
});