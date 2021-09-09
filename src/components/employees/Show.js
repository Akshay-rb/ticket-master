import axios from '../../config/axios'
import React from 'react'
import {Link} from 'react-router-dom'



export default class EmployeeShow extends React.Component{
    constructor(){
        super()
        this.state={
            employee:{}
        }
    }

    componentDidMount(){
        // const id = this.props.match.params.id
        // console.log('employee show CDM', id)
        axios.get(`/employees/${this.props.match.params.id}`, {
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            const employee = response.data
            console.log(employee.department.name)
            this.setState({employee})
        })
        .catch(error=>console.log(error))
        
    }

    render(){
        console.log(this.state.employee.department)
        return(
            <div>
                <h2>Employee details</h2>
                <p> name- {this.state.employee.name}</p>
                <p>email - {this.state.employee.email}</p>
                <p>department- {}</p>
                <Link to='/employees'>Back</Link>
            </div>
            
        )
    }
}