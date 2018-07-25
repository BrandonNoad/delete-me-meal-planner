import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const configureStore = () => {

    const middleware = [thunk];

    if (process.env.NODE_ENV !== 'production') {
        middleware.push(logger);
    }

    return createStore(
       rootReducer,
       applyMiddleware(...middleware)
    );
};

export default configureStore;
