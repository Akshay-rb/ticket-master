// import axios from 'axios'
import React from 'react'
import _ from 'lodash'
import axios from '../../config/axios'
import DepartmentForm from './Form'
import FormError from '../common/FormError'

export default class DepartmentList extends React.Component{
    constructor(){
        super()
        this.state={
            departments:[],
            errors:{}
        }
        this.handleSubmit= this.handleSubmit.bind(this)
    }

    componentDidMount(){
        axios.get('/departments',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            // console.log(response.data)
            const departments= response.data
            this.setState({departments})
        })
        .catch(error=> console.log(error))
    }

    handleSubmit(formData){
        // console.log(formData)
        axios.post('/departments', formData, {
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            if(response.data.errors){
                // window.alert(response.data.message)
                // // in this example we only have one field , so directly errors.name.message.... if we had more fields, errors objects will have all the errors -- so we need to use for in loop
                // console.log(response.data.errors.name.message)
                // const errorMessage = response.data.errors.name.message
                // this.setState({errorMessage})

                const errors = response.data.errors
                this.setState({errors})

            }else{
                const department = response.data
                this.setState(prevState=>({
                    departments:[...prevState.departments, department],
                    errors:{}
                }))
            }
        })
        .catch(error=>console.log(error))
    }

    render(){
        return(
            <div>
                <h1>Listing Departments- {this.state.departments.length}</h1>

                {
                    !_.isEmpty(this.state.errors) && <FormError errors={this.state.errors}/>
                }

                <DepartmentForm handleSubmit={this.handleSubmit}/>

                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.departments.map((department, index)=>{
                            return(
                                <tr key={department._id}>
                                    <td>{index +1}</td>
                                    <td>{department.name}</td>
                                </tr>    
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}