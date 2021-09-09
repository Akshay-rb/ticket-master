import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

export default class EmployeeList extends React.Component{
    constructor(){
        super()
        this.state={
            employees:[],
            errors:{}
        }
    }

    componentDidMount(){
        axios.get('/employees',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            // console.log(response.data)
            if(response.data.errors){
                console.log('list-response-CDM',response.data.errors)
                const errors = response.data.errors
                this.setState({errors})
            } else{
                console.log('list-CDM',response.data)
                const employees = response.data
                this.setState({employees})
            }
        })
        .catch(err=>console.log(err))
    }

    render(){
        return(
            <div>
                <h1>Listing employees-{this.state.employees.length}</h1>
                <ul>
                    {this.state.employees.map(employee=>{
                        return <li key={employee._id}>name-{employee.name} | department-{employee.department.name}</li>
                    })}
                </ul>
                <table style={{border:'1px solid '}}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>name</th>
                            <th>department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map((employee,index)=>{
                            return(
                                <tr key={employee._id}>
                                    <td>{index+1}</td>
                                    <td><Link to ={`/employees/${employee._id}`}>{employee.name}</Link></td>
                                    <td>{employee.department.name}</td>
                                    {/* <td>{employee._id}</td> */}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {/* <EmployeeShow /> */}
                <br />
                <Link to="/employees/new">Add Employee</Link>
            </div>
        )
    }
}