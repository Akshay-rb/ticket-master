import React from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'

import CustomerList from './components/customers/List'

function App(){
    return(
        <BrowserRouter>
        <div>
            <h1>Ticket Master</h1>
            <Link to="/">Home</Link> |
            <Link to="/customers">Customers</Link> |
            <Link to="/departments">Departments</Link> |

            <Route path="/customers" component={CustomerList}/>

        </div>
        </BrowserRouter>
    )
}

export default App