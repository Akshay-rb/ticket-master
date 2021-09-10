import _ from 'lodash'
import React from 'react'
import {Link} from 'react-router-dom'

import axios from '../../config/axios'
import FormError from '../common/FormError'

export default class CustomerShow extends React.Component{
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
            console.log(response.data)
            this.setState({customer})
        })
        .catch(error=>console.log(error))
    }

    handleRemove = e =>{
        const id = this.props.match.params.id
        axios.delete(`/customers/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            if(response.data.errors){
                const errors = response.data.errors
                this.setState({errors})
            }else{
                this.props.history.push('/customers')
            }
        })
        .catch(error=> console.log(error))
    }

    render(){
        const id = this.props.match.params.id
        return(
            <div>
                <h2>Customer details</h2>
                <p>{this.state.customer.name} - {this.state.customer.email}
                <button onClick={this.handleRemove}>remove</button>
                </p>
                <Link to ={`/customers/edit/${id}`}>edit</Link> |
                {/* <Link to={`/customers/remove/${id}`}> remove</Link> | */}

                {!_.isEmpty(this.state.errors) && <FormError/>}

               
                
                <Link to ='/customers'> back</Link>
            </div>
        )
    }
}