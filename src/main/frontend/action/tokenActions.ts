export const SET_TOKEN = 'SET_TOKEN';

export interface SetTokenAction {
  type: typeof SET_TOKEN;
  payload: string;
}

export type TokenActionTypes = SetTokenAction;