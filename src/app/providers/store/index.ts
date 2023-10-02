import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './config/rootReducer'

export const store = createStore(rootReducer, applyMiddleware(thunk))
export * from './hooks/useTypedSelector'
export * from './hooks/useActions'
