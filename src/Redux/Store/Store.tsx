import { Store, applyMiddleware , createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import { History } from "history";
import Reducers from "../Reducer/Reducer";

// 创建集中管理stroe
const configureStore = (history: History, initState?: string):Store => {
    const middleware = applyMiddleware(thunkMiddleware, routerMiddleware(history));
    return createStore(
        Reducers.combineReducers,
        middleware
    ) as Store;
}

export default configureStore;