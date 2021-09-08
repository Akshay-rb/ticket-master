import React from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'

import CustomerList from './components/customers/List'
import CustomerNew from './components/customers/New'

import DepartmentList from './components/departments/List'

import EmployeeList from './components/employees/List'
import EmployeeNew from './components/employees/New'

function App(){
    return(
        <BrowserRouter>
        <div>
            <h1>Ticket Master</h1>
            <Link to="/">Home</Link> |
            <Link to="/customers">Customers</Link> |
            <Link to="/departments">Departments</Link> |
            <Link to ="/employees">Employees</Link>

            <Route path="/customers" component={CustomerList} exact={true} />
            <Route path='/departments' component={DepartmentList} />
            <Route path='/customers/new' component={CustomerNew} />

            <Route path="/employees" component={EmployeeList} exact={true} />
            <Route path="/employees/new" component={EmployeeNew} />

        </div>
        </BrowserRouter>
    )
}

export default App