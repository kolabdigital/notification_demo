import { browserHistory } from 'react-router';

export const register = 'layout';


export const initialState = {
  isLoading: false
};


export class RedirectTo { 
  action (path) {
    browserHistory.push(path);

    return { type: 'LOCATION', payload: path };
  }
}

export class Loading {
  action (bool) {
    return { type: 'LOADING', payload: bool };
  }

  reducer (state, action) {
    return {...state, appIsLoading: action.payload};
  }
}