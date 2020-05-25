import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers';
import rootEpic from './store/epics';

const logger = createLogger({collapsed: true});

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default createStore(
//   rootReducer,
//   // compose(applyMiddleware(logger),applyMiddleware(thunk))
//   composeEnhancers(
//     applyMiddleware(
//       applyMiddleware(epicMiddlewareConfig),
//       logger,
//       thunk,
//     )
//   )
// );

  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(epicMiddleware),
      applyMiddleware(
            logger,
            thunk,
          )
        )
  );

  epicMiddleware.run(rootEpic);

  export default store