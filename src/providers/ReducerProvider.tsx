import {useReducer} from 'react';

import createCtx from '../utils/createCtx';

interface User {
  displayName: string;
  age: number;
  job: string;
}

interface Context {
  state: State;
  setUser: (user: Partial<User>) => void;
}

const [useCtx, Provider] = createCtx<Context>();

export enum ActionType {
  SetUser = 'set-user',
}

export interface State {
  user: User;
}

const initialState: State = {
  user: {
    displayName: '',
    age: 0,
    job: '',
  },
};

interface SetUserAction {
  type: ActionType.SetUser;
  payload: Partial<User>;
}

type Action = SetUserAction;

interface Props {
  children?: JSX.Element;
}

type Reducer = (state: State, action: Action) => State;

const setUser =
  (dispatch: React.Dispatch<Action>) =>
  (user: Partial<User>): void => {
    dispatch({
      type: ActionType.SetUser,
      payload: user,
    });
  };

// eslint-disable-next-line default-param-last
const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'set-user':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

function ReducerProvider({children}: Props): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    setUser: setUser(dispatch),
  };

  return <Provider value={{state, ...actions}}>{children}</Provider>;
}

export {useCtx as useReducerContext, ReducerProvider};
