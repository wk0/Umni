import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom';
import App from './App'
import { Provider } from 'react-globally'

const initialState = {
    presaleContractAddress : "",
    lookupContractAddress : ""
}

ReactDOM.render(
<Provider globalState={initialState}>     
<BrowserRouter>
            <App/>    
</BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
