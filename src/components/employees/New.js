import axios from '../../config/axios'
import React from 'react'
import _ from 'lodash'

import EmployeeForm from './Form'
import FormError from '../common/FormError'

export default class EmployeeNew extends React.Component{
    constructor(){
        super()
        this.state={
            errors:{}
        }
    }

    handleSubmit=(formData) =>{
        axios.post('/employees', formData,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            if(response.data.errors){
                console.log('New handleSubmit')
                const errors= response.data.errors
                this.setState({errors})
            }else{
                this.props.history.push('/employees')
            }
        })
        .catch(errors=> console.log(errors))
    }

    render(){
        return(
            <div>
                <h1>Add Employee</h1>
                {
                    !_.isEmpty(this.state.errors) && <FormError errors={this.state.errors} />
                }
                <EmployeeForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}