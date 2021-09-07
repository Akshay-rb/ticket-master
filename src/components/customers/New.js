import React from 'react'
import axios from '../../config/axios'
import _ from 'lodash'

import FormError from '../common/FormError'
import CustomerForm from './Form'


export default class CustomerNew extends React.Component{
    constructor(){
        super()
        this.state={
            errors:{}
        }
    }

    handleSubmit = formData =>{
        axios.post('/customers', formData, {
            headers:{
                'x-auth': localStorage.getItem('token')
            }
        })
        .then(response=>{
            console.log(response.data)
            if(response.data.errors){
                const errors = response.data.errors
                this.setState({errors})
            }else{
                this.props.history.push('/customers') // --------- redirect using react router dom --- property called as history , we need to call a methos push , specify the redirect
            }
        })
        .catch(error=>console.log(error))
    }

    render(){
        return(
            <div>
                <h2>Add customer</h2>
                {
                    !_.isEmpty(this.state.errors) && <FormError errors={this.state.errors}/>
                }
                <CustomerForm handleSubmit={this.handleSubmit}/>

            </div>
        )
    }
}