import React from 'react'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'

import CustomerList from './components/customers/List'
import CustomerNew from './components/customers/New'
import CustomerShow from './components/customers/Show'
import CustomerEdit from './components/customers/Edit'
// import CustomerRemove from './components/customers/Remove'

import DepartmentList from './components/departments/List'

import EmployeeList from './components/employees/List'
import EmployeeNew from './components/employees/New'
import EmployeeShow from './components/employees/Show'

function App(){
    return(
        <BrowserRouter>
        <div>
            <h1>Ticket Master</h1>
            <Link to="/">Home</Link> |
            <Link to="/customers">Customers</Link> |
            <Link to="/departments">Departments</Link> |
            <Link to ="/employees">Employees</Link>
            
            <Switch>
                <Route path="/customers" component={CustomerList} exact={true} />
                <Route path='/customers/new' component={CustomerNew} />
                <Route path='/customers/edit/:id' component={CustomerEdit} />
                {/* <Route path='/customers/remove/:id' component={CustomerRemove} /> */}
                <Route path='/customers/:id' component={CustomerShow} />

                
    
                <Route path='/departments' component={DepartmentList} />
    
    
                <Route path="/employees" component={EmployeeList} exact={true} />
                <Route path="/employees/new" component={EmployeeNew} />
                <Route path="/employees/:id" component={EmployeeShow} />
            </Switch>

        </div>
        </BrowserRouter>
    )
}

export default App