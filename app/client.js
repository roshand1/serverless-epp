
import React from 'react'
import {render} from 'react-dom'
import App from '../src/App.js'
import store from '../redux/store'
import { Provider } from 'react-redux'

render(
       <Provider store={store}>
            <App></App>    
        </Provider>,
    document.getElementById('app')//DOM element we want to mount it to
)