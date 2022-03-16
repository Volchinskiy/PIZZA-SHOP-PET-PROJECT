import { createStore, compose, applyMiddleware} from "redux";
import rootReduser from './reducers';
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(rootReduser, composeEnhancers(applyMiddleware(thunk)));

export default store;