import camel from 'to-camel-case';
import snake from 'to-snake-case';
import { compose, createStore } from 'redux';
import register from './redux-register';


// Returns modules methods
function reduxMethods (register, method) {
  return function (fn) {
      return Object.keys(register).reduce((previousObj, currentKey) => {
      let Class = currentKey !== 'initialState' && currentKey !== 'register'
        ? new register[currentKey]()
        : {};

      if (Class[method] == null) return previousObj;
      
      return fn({ previousObj, currentKey, method, Class });
    }, {});
  }
}


// Register each modules initial state
export const initialState = register.reduce((previousObj, currentModule) => {
  return {
    ...previousObj, 
    [currentModule.register]: currentModule.initialState
  }
}, {});


// Register each modules actions
export const actions = register.reduce((previous, current) => {
  return {
    ...previous, 
    ...reduxMethods(current, 'action')(({ previousObj, currentKey, method, Class }) => {
      return {
        ...previousObj,
        [camel(currentKey)]: Class[method]
      }
    })
  }
}, {});


// Register each modules reducers
export const reducers = (props = {}) => (state = initialState, action) => {
  return register.reduce((previous, currentModule) => {
    const moduleName = currentModule.register;

    const reducer = (state,  action) => {
      const actions = reduxMethods(currentModule, 'reducer')(({ previousObj, currentKey, method, Class }) => {
        return { 
          ...previousObj,
          [snake(currentKey).toUpperCase()]: Class[method](state, action)
        }
      });
      return actions[action.type] || state;
    }
    return {
      ...previous,
      [moduleName]: reducer(state[moduleName], action)
    }      
  }, props);
};


// Map store state to props
export function mapStateToProps (state) {
  return register.reduce((previousObj, currentModule) => {
    const moduleName = currentModule.register;

    return {
      ...previousObj,
      initialState,
      ...Object.keys(currentModule.initialState).reduce((previous, currentKey) => {
        return {
          ...previous,
          [currentKey] : state[moduleName][currentKey]
        }
      }, {})
    }
  }, {});
}


// Compose redux enhancers and middleware
const composeEnhancers = (() => {
  const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  if(process.env.NODE_ENV === 'development' && compose_) {
    return compose_({ actions });
  }
  return compose;
})();


// export redux store
export const store = props => createStore(reducers(props.reducers), initialState, composeEnhancers(...props.middleware));


