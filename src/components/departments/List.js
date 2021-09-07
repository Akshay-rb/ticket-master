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
            errors:{},
            search:''
        }
        this.handleSubmit= this.handleSubmit.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
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

    handleRemove(id){
        const handleRemove = window.confirm('Are you sure?')
        if(handleRemove){
            
        axios.delete(`/departments/${id}`, {
            headers:{
                'x-auth': localStorage.getItem('token')
            }
        })
        .then(response=>{
            console.log(response.data)
            this.setState(prevState=>({
                departments:prevState.departments.filter(department=> department._id !== response.data._id)
            }))
        })
        .catch(error=> console.log(error))
        }
    }

    handleSearch(e){
    //     const search=e.target.value
    //     this.setState(prevState=>({
    //         departments: prevState.departments.filter(department=> department.name.toLowerCase().includes(search)),
    //         search
    //     }))
     }

    render(){
        return(
            <div>
                <h1>Listing Departments- {this.state.departments.length}</h1>

                {
                    !_.isEmpty(this.state.errors) && <FormError errors={this.state.errors}/>
                }
                {/* <label>
                <input type="text" 
                       value={this.state.search}
                       onChange={this.handleSearch} 
                       placeholder='search....'
                />
                </label>
                <br/>
                <br/> */}
                
                <DepartmentForm handleSubmit={this.handleSubmit} handleSearch={this.handleSearch}/>

                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>name</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.departments.map((department, index)=>{
                            return(
                                <tr key={department._id}>
                                    <td>{index +1}</td>
                                    <td>{department.name}</td>
                                    <td> <button onClick={()=>{
                                        this.handleRemove(department._id)
                                    }}>remove</button> </td>
                                </tr>    
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}