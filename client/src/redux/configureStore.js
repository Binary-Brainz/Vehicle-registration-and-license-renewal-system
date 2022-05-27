import {combineReducers} from 'redux';
import { createStoreHook } from 'react-redux';

export const configureStore = () => {
    const store = createStoreHook(
        combineReducers({
        })
        
    );

    return store;
}