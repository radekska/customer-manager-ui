import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux'
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import store from './store';
import {listCustomers} from "./redux/reducers/customers";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

store.dispatch(listCustomers())

root.render(
    <BrowserRouter>
        {/*<React.StrictMode>*/}
        <Provider store={store}>
            <App/>
        </Provider>
        {/*</React.StrictMode>*/}
    </BrowserRouter>
);
