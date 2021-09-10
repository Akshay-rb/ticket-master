import React from 'react'
import axios from '../../config/axios'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import CustomerForm from './Form'

class CustomerEdit extends React.Component{
    constructor(){
        super()
        this.state={
            customer:{},
            errors:{}
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/customers/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            const customer = response.data
            this.setState({customer})
        })
        .catch(error=>console.log(error))
    }

    handleSubmit = FormData =>{
        const id = this.props.match.params.id
        axios.put(`/customers/${id}`, FormData, {
            headers:{
                'x-auth': localStorage.getItem('token')
            }
        })
        .then(response=>{
            const errors= response.data.errors
            if(errors){
                this.setState({errors})
            }else{
                this.props.history.push(`/customers/${response.data._id}`)
            }
        })
    }

    render(){
        return(
            <div>
                <h2>Customer Edit</h2>
                {/* ---------------------------- conditional rendering without lodash------- */}
                {/* {(Object.keys(this.state.customer).length !== 0)&& <CustomerForm customer={this.state.customer} handleSubmit={this.handleSubmit} />} */}
                
                {/* ----------------OR----------------------- */}
                {/* here this.state.customer is empty - truthy... this.state.customer.name is undefined - which is falsy ...... so we can have conitional rendering done here */}

                {/* {(this.state.customer.name) && ..............} */}

                {!_.isEmpty(this.state.customer) && <CustomerForm customer={this.state.customer} handleSubmit={this.handleSubmit} />}
                
                {/* <CustomerForm customer={this.state.customer}/> */}
                <Link to='/customers'>back</Link>
            </div>
        )
    }
}

export default CustomerEdit