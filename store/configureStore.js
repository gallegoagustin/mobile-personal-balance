import { createStore, applyMiddleware } from 'redux'
import Reducer from './reducers/index'
import thunk from 'redux-thunk'

export default configureStore = () => {
    let store = createStore(Reducer, applyMiddleware(thunk))
    return store
}