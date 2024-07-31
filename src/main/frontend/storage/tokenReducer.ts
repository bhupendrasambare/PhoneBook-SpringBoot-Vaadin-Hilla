import { SET_TOKEN, TokenActionTypes } from '../action/tokenActions';

interface TokenState {
  token: string;
}

const initialState: TokenState = {
  token: ''
};

const tokenReducer = (state = initialState, action: TokenActionTypes): TokenState => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
};

export default tokenReducer;