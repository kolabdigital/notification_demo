import * as redux from 'redux';
// import DevTools from './modules/devtools/dev-tools-component';
import thunk from 'redux-thunk';
import { actions, mapStateToProps, store } from './redux-modules';
import { routerMiddleware, routerReducer } from 'react-router-redux';


export default props => store({
  middleware: [redux.applyMiddleware(thunk, routerMiddleware(props.history))],
  reducers: {
    router: routerReducer
  }
});

export const connect = Component => redux.connect(mapStateToProps, actions)(Component);

