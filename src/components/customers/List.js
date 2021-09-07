// import axios from 'axios'
import React from 'react'

import axios from '../../config/axios'

export default class CustomerList extends React.Component{
    constructor(){
        super()
        this.state={
            customers:[]
        }
    }

    componentDidMount(){
        axios.get('/customers', {
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response =>{
            // console.log(response.data)
            const customers = response.data
            this.setState({customers})
        })
        .then(error => console.log(error))
    }

    render(){
        return(
            <div>
                <h1>Listing Customers- {this.state.customers.length}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>name</th>
                            <th>email</th>
                            <th>Mobile</th>
                        </tr>
                    </thead>                      
                    <tbody>
                        {this.state.customers.map((customer, index)=>{
                            return(
                                    <tr key={customer._id}> 
                                        <td>{index+1}</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.mobile}</td>
                                    </tr>
                                    )
                            })}
                    </tbody>
                </table>

            </div>
        )
    }
}