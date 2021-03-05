import { createStore, applyMiddleware, Store } from 'redux'
import reducer from '../reducers'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

const middlewares = [reduxThunk]

let store: Store

export default function create(initState?: object) {
  if (store) return store

  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger') // eslint-disable-line
    middlewares.push(logger)
  }

  const composeEnhancers = composeWithDevTools({
    // options like actionSanitizer, stateSanitizer
  });

  store = createStore(
    reducer(),
    initState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store
}
